import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsCards = ({ members }) => {
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === "Active").length;
  const inactiveMembers = members.filter((m) => m.status === "Inactive").length;

  const basicMembers = members.filter(
    (m) => m.membershipType === "Basic"
  ).length;
  const premiumMembers = members.filter(
    (m) => m.membershipType === "Premium"
  ).length;
  const vipMembers = members.filter((m) => m.membershipType === "VIP").length;

  const stats = [
    {
      title: "Total Members",
      value: totalMembers,
      description: "All registered members",
      color: "text-blue-600",
    },
    {
      title: "Active Members",
      value: activeMembers,
      description: `${inactiveMembers} inactive`,
      color: "text-green-600",
    },
    {
      title: "Premium Members",
      value: premiumMembers,
      description: `${basicMembers} Basic, ${vipMembers} VIP`,
      color: "text-purple-600",
    },
    {
      title: "Membership Rate",
      value:
        totalMembers > 0
          ? `${Math.round((activeMembers / totalMembers) * 100)}%`
          : "0%",
      description: "Active vs Total",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
