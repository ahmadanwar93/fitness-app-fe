import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MembersTable = ({ members, loading, onView, onDelete }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Loading members...</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">
          No members found. Add your first member!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Phone</TableHead>
            <TableHead className="text-left">Membership</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-left">Joined Date</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium text-left">
                {member.firstName} {member.lastName}
              </TableCell>
              <TableCell className="text-left">{member.email}</TableCell>
              <TableCell className="text-left">{member.phone}</TableCell>
              <TableCell className="text-left">
                {member.membershipType}
              </TableCell>
              <TableCell className="text-left">
                <Badge
                  variant={member.status === "Active" ? "default" : "secondary"}
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell className="text-left">{member.joinedDate}</TableCell>
              <TableCell className="text-left">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(member)}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(member)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MembersTable;
