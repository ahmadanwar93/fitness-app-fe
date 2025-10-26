import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const ViewMemberModal = ({ open, onClose, member, onEdit }) => {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Member Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">
              First Name
            </label>
            <p className="mt-1 text-base text-gray-900">{member.firstName}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Last Name
            </label>
            <p className="mt-1 text-base text-gray-900">{member.lastName}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1 text-base text-gray-900">{member.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <p className="mt-1 text-base text-gray-900">{member.phone}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Date of Birth
            </label>
            <p className="mt-1 text-base text-gray-900">
              {member.dateOfBirth || "N/A"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Membership Type
            </label>
            <p className="mt-1 text-base text-gray-900">
              {member.membershipType}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <div className="mt-1">
              <Badge
                variant={member.status === "Active" ? "default" : "secondary"}
              >
                {member.status}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Joined Date
            </label>
            <p className="mt-1 text-base text-gray-900">{member.joinedDate}</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            type="button"
            onClick={() => {
              onClose();
              onEdit(member);
            }}
          >
            Edit Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMemberModal;
