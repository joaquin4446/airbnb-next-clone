import { Suspense } from "react";
import { RoomLoadingState } from "@/components/RoomLoadingState";
import { RoomDetailPage } from "@/components/RoomDetailPage";
import { RoomNavigation } from "@/components/RoomNavigation";

interface RoomRouteProps {
  params: Promise<{ id: string }>;
}

const RoomRouteContent = async ({ params }: RoomRouteProps) => {
  const { id } = await params;
  return <RoomDetailPage roomId={id} />;
};

const RoomRoute = ({ params }: RoomRouteProps) => (
  <Suspense fallback={<><RoomNavigation /><RoomLoadingState /></>}>
    <RoomRouteContent params={params} />
  </Suspense>
);

export default RoomRoute;
