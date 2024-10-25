import Image from "next/image";

const UserProfile = () => {
    return (
        <div className="h-60 w-full font-open-sans shadow-lg shadow-[#F0F0FC] p-4">
            <div className="flex items-center mb-4">
                <Image
                    src="/profile.svg"
                    alt="profile"
                    width={62}
                    height={62}
                />
                <div className="ml-2">
                    <h1 className="text-lg font-bold text-[#191F2A]">
                        Faisal Kemal
                    </h1>
                    <div className="flex items-center">
                        <Image
                            src="/man.svg"
                            alt="man"
                            width={20}
                            height={20}
                        />
                        <h3 className="text-sm text-[#3B4963]">Laki-laki</h3>
                    </div>
                    <h3 className="text-sm text-[#3B4963]">1 September 1987</h3>
                </div>
            </div>
            <div className="text-sm text-[#3B4963] mb-4">
                <h3 className="font-bold">Contact Detail</h3>
                <div className="flex items-center mt-1">
                    <h3>628123456789</h3>
                    <span className="text-[#E0E4EC] mx-1 text-lg translate-y-[2px] inline-block">
                        •
                    </span>
                    <h3>faisalkemal@gmail.com</h3>
                </div>
            </div>
            <div className="text-sm text-[#3B4963] mb-4">
                <h3 className="font-bold">Nomor MR</h3>
                <h3 className="mt-1">12345678</h3>
            </div>
        </div>
    );
};

export default UserProfile;
