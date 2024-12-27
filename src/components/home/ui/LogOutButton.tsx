import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { DoorClosed, DoorOpen } from "lucide-react";

export const LogOutButton = () => {
  const router = useRouter();

  const logOut = async () => {
    await deleteCookie("userId");

    router.push("/login");
  };

  return (
    <>
      <div
        onClick={() => logOut()}
        className="hidden md:block group absolute top-14 right-14 hover:shadow-[0px_0px_60px_5px_#ab0e5f] cursor-pointer text-white bg-gradient-to-r from-pink-primary to-pink-500 rounded-full p-[6px] hover:transform hover:scale-110 transition-transform duration-300 ease-in-out"
      >
        <DoorOpen className="w-8 h-8 hidden group-hover:block" />
        <DoorClosed className="w-8 h-8 group-hover:hidden" />
      </div>

      <div
        onClick={() => logOut()}
        className="block md:hidden fixed bottom-4 left-4 z-50  cursor-pointer text-white bg-gradient-to-r from-pink-primary to-pink-500 rounded-full p-[6px]"
      >
        <DoorOpen className="w-8 h-8" />
      </div>
    </>
  );
};
