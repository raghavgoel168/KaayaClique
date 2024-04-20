import React from "react";

const DisplayUsers = () => {
    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-bold text-center p-2">Display Users</h1>
            <div className="flex flex-col justify-center p-4">
                <table className="p-2">
                    <thead className="p-2">
                        <tr className="">
                            <th className="border border-gray-400">Name</th>
                            <th className="border border-gray-400">Email</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}
export default DisplayUsers;
