import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import MembersTable from "@/components/members/MembersTable";
import AddMemberModal from "@/components/members/AddMemberModal";
import EditMemberModal from "@/components/members/EditMemberModal";
import ViewMemberModal from "@/components/members/ViewMemberModal";
import DeleteMemberDialog from "@/components/members/DeleteMemberDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { membersApi } from "@/lib/membersApi";
import { toast } from "sonner";
import MembersFilters from "@/components/dashboard/MembersFilters";

const DashboardPage = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    membershipType: "all",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    let filtered = [...members];

    if (filters.status !== "all") {
      filtered = filtered.filter((m) => m.status === filters.status);
    }

    if (filters.membershipType !== "all") {
      filtered = filtered.filter(
        (m) => m.membershipType === filters.membershipType
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(filtered);
  }, [searchTerm, filters, members]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await membersApi.getAll();

      if (response.success && response.data) {
        setMembers(response.data);
        setFilteredMembers(response.data);
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to load members",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (memberData) => {
    try {
      const response = await membersApi.create(memberData);

      if (response.success) {
        await fetchMembers();
      }
    } catch (error) {
      throw error;
    }
  };

  const handleViewClick = (member) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleUpdateMember = async (id, memberData) => {
    try {
      const response = await membersApi.update(id, memberData);
      console.log("Member updated:", response);

      if (response.success) {
        await fetchMembers();
      }
    } catch (error) {
      console.error("Error updating member:", error);
      throw error;
    }
  };

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMember) return;

    try {
      setDeleteLoading(true);
      const response = await membersApi.delete(selectedMember.id);
      console.log("Member deleted:", response);

      if (response.success) {
        await fetchMembers();
        setShowDeleteDialog(false);
        setSelectedMember(null);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 lg:hidden">
            Members
          </h2>

          <div className="hidden lg:flex lg:items-center lg:justify-between gap-6">
            <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
              Members
            </h2>

            <div className="flex items-center gap-3">
              <MembersFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />

              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[280px]"
                />
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="whitespace-nowrap"
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-3">
            <MembersFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={() => setShowAddModal(true)}
                className="whitespace-nowrap"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <MembersTable
          members={filteredMembers}
          loading={loading}
          onView={handleViewClick}
          onDelete={handleDeleteClick}
        />

        <AddMemberModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddMember}
        />

        <ViewMemberModal
          open={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedMember(null);
          }}
          member={selectedMember}
          onEdit={handleEditClick}
        />

        <EditMemberModal
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedMember(null);
          }}
          onSuccess={handleUpdateMember}
          member={selectedMember}
        />

        <DeleteMemberDialog
          open={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedMember(null);
          }}
          onConfirm={handleDeleteConfirm}
          member={selectedMember}
          loading={deleteLoading}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
