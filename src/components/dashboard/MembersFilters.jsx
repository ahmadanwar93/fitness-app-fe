import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const MembersFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex items-center gap-2">
        <Label
          htmlFor="status-filter"
          className="text-sm font-medium whitespace-nowrap"
        >
          Status
        </Label>
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange("status", value)}
        >
          <SelectTrigger id="status-filter" className="w-[140px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label
          htmlFor="membership-filter"
          className="text-sm font-medium whitespace-nowrap"
        >
          Membership Type
        </Label>
        <Select
          value={filters.membershipType}
          onValueChange={(value) => onFilterChange("membershipType", value)}
        >
          <SelectTrigger id="membership-filter" className="w-[140px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Basic">Basic</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="VIP">VIP</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MembersFilters;
