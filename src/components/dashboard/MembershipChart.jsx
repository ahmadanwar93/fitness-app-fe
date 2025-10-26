import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const MembershipChart = ({ members }) => {
  const basicCount = members.filter((m) => m.membershipType === "Basic").length;
  const premiumCount = members.filter(
    (m) => m.membershipType === "Premium"
  ).length;
  const vipCount = members.filter((m) => m.membershipType === "VIP").length;

  const data = [
    { name: "Basic", count: basicCount },
    { name: "Premium", count: premiumCount },
    { name: "VIP", count: vipCount },
  ];

  const COLORS = {
    Basic: "#3b82f6",
    Premium: "#8b5cf6",
    VIP: "#f59e0b",
  };

  if (members.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Members by Membership Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MembershipChart;
