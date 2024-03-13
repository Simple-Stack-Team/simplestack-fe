import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Proposal = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button>Accept</Button>
        <Button variant="outline_reject">Reject</Button>
      </CardFooter>
    </Card>
  );
};

export default Proposal;
