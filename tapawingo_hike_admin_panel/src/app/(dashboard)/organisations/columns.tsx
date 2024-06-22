import {ColumnDef} from "@tanstack/react-table";
import {FaTrash} from "react-icons/fa6";
import {EditOrCreateDialog} from './editOrCreateDialog';
import {Organisation} from '@/types/organisation';
import { useRouter } from 'next/navigation';
import apiClient from "@/lib/apiClient";
import { API_BASE_URL } from "@/lib/utils";

export type ColumnsProps = {
  data: Organisation[];
  onChange: () => void;
};

export const useOrganisationColumns = ({onChange}: ColumnsProps) => {
  const router = useRouter();

  const handleUpdate = async (organisation: Organisation) => {
    try {
      await fetch(`${API_BASE_URL}/organisations/${organisation.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(organisation),
      });
      onChange();
    } catch (error) {
      console.error('Error updating organisation:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_BASE_URL}/organisations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onChange();
    } catch (error) {
      console.error('Error deleting organisation:', error);
    }
  };

  const handleCellClick = (organisationId: number) => {
      router.push(`/organisations/${organisationId}/events`);
  };

  const columns: ColumnDef<Organisation>[] = [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <div
            className="cursor-pointer"
            onClick={() => handleCellClick(row.original.id)}
          >
            {row.getValue('id')}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Organisation",
        cell: ({ row }) => (
          <div
            className="cursor-pointer"
            onClick={() => handleCellClick(row.original.id)}
          >
            {row.getValue('name')}
          </div>
        ),
      },
      {
        accessorKey: "contactPerson",
        header: "Contact Person",
        cell: ({ row }) => (
          <div
            className="cursor-pointer"
            onClick={() => handleCellClick(row.original.id)}
          >
            {row.getValue('contactPerson')}
          </div>
        ),
      },
      {
        accessorKey: "contactEmail",
        header: "Contact Email",
        cell: ({ row }) => (
          <div
            className="cursor-pointer"
            onClick={() => handleCellClick(row.original.id)}
          >
            {row.getValue('contactEmail')}
          </div>
        ),
      },
      {
        id: "actions",
        cell: ({row}) => {
          const organisation = row.original;
          return (
              <div className="flex space-x-2">
                <EditOrCreateDialog
                    value={organisation}
                    onSave={handleUpdate}
                />
                <button
                    onClick={() => handleDelete(organisation.id!!)}
                    className="text-red-500"
                >
                  <FaTrash/>
                </button>
              </div>
          );
        },
      },
  ];
  return {columns};
};
