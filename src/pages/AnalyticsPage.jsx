import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import StatsCards from "@/components/dashboard/StatsCards";
import MembersFilters from "@/components/dashboard/MembersFilters";
import MembershipChart from "@/components/dashboard/MembershipChart";
import { membersApi } from "@/lib/membersApi";

const AnalyticsPage = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    membershipType: "all",
  });
  const [loading, setLoading] = useState(true);
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

    setFilteredMembers(filtered);
  }, [filters, members]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await membersApi.getAll();

      if (response.success && response.data) {
        setMembers(response.data);
        setFilteredMembers(response.data);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      alert("Failed to load members data");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h2>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <MembersFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <p className="text-sm text-gray-600">
            {filters.status !== "all" || filters.membershipType !== "all" ? (
              <>
                Showing filtered data: {filteredMembers.length} of{" "}
                {members.length} members
              </>
            ) : (
              <>Showing data for all {members.length} members</>
            )}
          </p>
        </div>

        <StatsCards members={filteredMembers} />

        <MembershipChart members={filteredMembers} />

        {filteredMembers.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">
              No members match the selected filters. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
