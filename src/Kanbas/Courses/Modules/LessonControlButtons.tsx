import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import ProtectedAdminRoute from "../../Account/ProtectedAdminRoute";

export default function LessonControlButtons({ moduleId, deleteModule, editModule }: {
    moduleId: string; deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void
}) {
    return (
        <div className="float-end">
            <ProtectedAdminRoute>
                <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
                <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
            </ProtectedAdminRoute>
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
