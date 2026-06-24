import Pic from "@/components/Pic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCloudinaryUrl } from "@/lib/utils";
import type { User } from "@/types/users";
import { BadgeX, SquarePen, Verified } from "lucide-react";
import { Link } from "react-router-dom";

function ProfileHeader({ user }: { user: User }) {
  return (
    <Card
      style={{ background: "linear-gradient(90deg, #166a9e 0%, #199193 100%)" }}
    >
      <CardContent className="flex justify-between items-center text-gray-200">
        <section className="flex gap-6 items-center">
          <Pic className="w-20 h-20" img={getCloudinaryUrl(user.profile_img)} />

          <div>
            <h2 className="text-lg font-bold">
              {user.first_name} {user.last_name}
              <Verified className="w-5 h-5 inline-block text-green-300 -mt-0.5" />
            </h2>
            <p className="text-sm font-semibold text-gray-300">
              {user.username} · #{user.id}
            </p>
            <p className="text-sm font-semibold text-gray-300">
              {user.email} · {user.phone}
            </p>

            <div className="my-2">
              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none mr-2">
                {user.role}
              </Badge>

              {user.is_verified ? (
                <Badge className="bg-green-100 backdrop-blur-md border border-white/20 text-green-600 shadow-none mr-2">
                  <>
                    <Verified /> Verified
                  </>
                </Badge>
              ) : (
                <Badge className="bg-red-100 backdrop-blur-md border border-white/20 text-destructive shadow-none mr-2">
                  <>
                    <BadgeX className="text-destructive" /> Unverified
                  </>
                </Badge>
              )}

              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none">
                Chennai, TN
              </Badge>
            </div>
          </div>
        </section>

        {/* <Button className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none px-6 py-6">
          <Camera /> Change Photo
        </Button> */}
        <Link
          to={"/settings"}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-none px-6 py-3 rounded-md"
        >
          <SquarePen className="w-4 h-4 inline-block -mt-1" /> Edit
        </Link>
      </CardContent>
    </Card>
  );
}

export default ProfileHeader;
