import { authOptions } from "@/utils/authOptions";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";

import { QUERY_KEYS, REAVALIDAION_TIME } from "@/actions/contants";
import { getSchool } from "@/actions/school";
import { Button } from "@/components/ui/button";
import { ORGANIZATION, SCHOOL } from "@/types/COMMON";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import { getOrganization } from "@/actions/organization";
type props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: props) => {
  const session = await getServerSession(authOptions);
  let organization: ORGANIZATION | null = null;
  if (session?.user) {
    organization = await getOrganization(params.id, session?.user.token);
  }
  if (!organization) return null;
  console.log({
    organization,
  });

  return (
    <div>
      <div className="flex md:items-start md:justify-between flex-col-reverse md:flex-row">
        <div>
          <h1 className="font-semibold text-3xl  mt-10 md:mt-0">
            {organization.name}{" "}
          </h1>
          <p className="text-muted-foreground text-sm">
            {new Date(organization.createdAt!).toLocaleDateString()}
          </p>
          <p className="text-accent-foreground text-sm mt-4">
            {organization.id}
          </p>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="flex items-center gap-4">
            <DeleteDialog
              queryKey={QUERY_KEYS.ALL_ORGANIZATIONS}
              type={REAVALIDAION_TIME.ORGANIZATION.type}
              path="/dashboard/organizations"
            />

            <Link href={"/dashboard/organizations/edit/" + organization.id}>
              <Button variant={"outline"}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>
          </div>
          <p className="text-sm">
            Last Modified by : {organization.lastModifiedBy?.username || "N/A"}
          </p>
          <p className="text-sm">
            Created by : {organization.createdBy?.username || "N/A"}
          </p>
        </div>
      </div>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-2  mt-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">
            Heads :{" "}
            <span className="text-sm text-muted-foreground">
              {organization.heads.length}
            </span>
          </h1>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-8">
            {organization.heads?.map((head) => (
              <div key={head.id} className="p-2">
                <div>
                  <p className="text-muted-foreground text-md uppercase">
                    {head.fullName || "N/A"}
                  </p>
                </div>
                <div>
                  <h1 className="text-md font-semibold">
                    <p className="text-muted-foreground text-sm">
                      {head?.source || "N/A"}
                    </p>
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-5" />
          <div>
            <h1 className="text-md font-semibold">Schools</h1>
            <div className="flex flex-wrap md:flex-nowrap flex-row  items-center gap-4 ">
              {organization.schools?.map((school) => (
                <div
                  key={school.id}
                  className="flex gap-2 items-start justify-around shadow-sm p-2"
                >
                  <div>
                    <h1 className="text-md font-semibold">Name</h1>
                    <p className="text-muted-foreground text-sm">
                      {school.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-md font-semibold">City</h1>
                    <p className="text-muted-foreground text-sm">
                      {school.city || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-md font-semibold">State</h1>
                    <p className="text-muted-foreground text-sm">
                      {school.state || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="text-accent-foreground md:mx-10 mb-10">
        <h3 className="text-md font-semibold">Notes</h3>
        <p className="leading-4 ">{organization?.notes || "N/A"}</p>
      </div>
      <Separator className="my-5" />
      {/* <div className="text-accent-foreground md:mx-10 mb-10">
        <h3 className="text-md font-semibold">Socials</h3>
        <div className="flex items-center flex-wrap gap-4">
          {school?.social?.length ? (
            school?.social?.map((social) => (
              <>
                <div
                  key={social.id}
                  className="flex flex-row items-center gap-2"
                >
                  <h1 className="text-md font-semibold">
                    Platform:{" "}
                    <span className="font-normal text-muted-foreground">
                      {social.platform}
                    </span>
                  </h1>
                  <h1 className="text-md font-semibold">
                    Account:{" "}
                    <span className="font-normal text-muted-foreground">
                      {social.account}
                    </span>
                  </h1>
                </div>
                <Separator orientation="vertical" />
              </>
            ))
          ) : (
            <p className="text-muted-foreground">No socials available</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default page;