import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  numberOf: string;
}

const DashboardCard = ({ title, numberOf }: Props) => {
  return (
    <Card>
      <CardHeader className="mb-[-20px] mt-[-10px]">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <p className="text-3xl font-semibold">{numberOf}</p>
        <div className="flex items-center gap-2 rounded-full border border-green-600 bg-green-100 px-2">
          <span className="h-2 w-2 rounded-full bg-green-600"></span>
          <span className="text-xs text-green-600">34%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
