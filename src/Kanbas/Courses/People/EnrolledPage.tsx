import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "./Table";
import * as accountClient from "../../Account/client";
import * as client from "../client";
import { FaPlus } from "react-icons/fa";
export default function EnrolledTable() {
    const [users, setUsers] = useState<any[]>([]);
    const { uid } = useParams();
    const { cid } = useParams();

    const fetchUsers = async () => {
        if (cid) {
            const users = await client.findUsersForCourse(cid);
            setUsers(users);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [uid]);
    return (
        <div>
            <h2>People</h2>
            <PeopleTable users={users} />
        </div>
    );
}