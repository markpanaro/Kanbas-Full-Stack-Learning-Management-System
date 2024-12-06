import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "./Table";
import * as accountClient from "../../Account/client";
import * as client from "../client";
import { FaPlus } from "react-icons/fa";
export default function EnrolledTable() {
    const [users, setUsers] = useState<any[]>([]);
    const { uid } = useParams();
    //const [role, setRole] = useState("");
    //const [name, setName] = useState("");
    const { cid } = useParams();

    /*
    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await accountClient.findUsersByPartialName(name);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await accountClient.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    /*
    const findUsersForCourse = async (courseId: string) => {

        if (courseId) {
            const users = await client.findUsersForCourse(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    }
    */
    const fetchUsers = async () => {
        //let users = await accountClient.findAllUsers();
        if (cid) {
            const users = await client.findUsersForCourse(cid);
            setUsers(users);
        }
        //setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
    }, [uid]);
    return (
        <div>

            <h2>People</h2>
            {/*
            <input onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
                className="form-control float-start w-25 me-2 wd-filter-by-name" />
            <select value={role} onChange={(e) => filterUsersByRole(e.target.value)}
                className="form-select float-start w-25 wd-select-role" >
                <option value="">All Roles</option>    <option value="STUDENT">Students</option>
                <option value="TA">Assistants</option> <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrators</option>
            </select>
            */}
            <PeopleTable users={users} />
        </div>
    );
}