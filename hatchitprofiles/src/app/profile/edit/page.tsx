'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { decodeToken, fetchUserDetails, UpdateUserData } from '../../util/userData';
import { clearUserData } from "@/app/store/userslice";
import Cookies from 'js-cookie';
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";

export default function EditProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const toast = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split('=')[1];
    if (!token) {
      router.push("/login");
      return;
    }

    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.id) {
      fetchUserData(decodedToken.id);
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchUserData = async (userId: string) => {
    try {
      const data = await fetchUserDetails(userId);
      setUserData(data);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to load user data",
        life: 3000,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [parent, key] = name.split(".");
    setUserData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
    const values = e.target.value.split("\n").filter((item) => item.trim() !== "");
    const [parent, key] = field.split(".");
    setUserData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: values,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      user: {
        _USERNAME: userData._USERNAME ?? "",
      },
      userDetails: {
        _ADDRESS: userData.userDetails._ADDRESS ?? "",
        _BIRTHDATE: userData.userDetails._BIRTHDATE?.split('T')[0] ?? "",
        _CONTACTNUMBER: userData.userDetails._CONTACTNUMBER ?? "",
        _EMERGENCY_CONTACT_NAME: userData.userDetails._EMERGENCY_CONTACT_NAME ?? "",
        _EMERGENCY_CONTACT_NUMBER: userData.userDetails._EMERGENCY_CONTACT_NUMBER ?? "",
        _POSITION: userData.userDetails._POSITION ?? "",
        _COMPANY_EMAIL: userData.userDetails._COMPANY_EMAIL ?? "",
        _HIGHSCHOOL: userData.userDetails._HIGHSCHOOL ?? "",
        _COLLEGE: userData.userDetails._COLLEGE ?? "",
        _ORGANIZATIONS: userData.userDetails._ORGANIZATIONS ?? "",
        _HATCHIT_START_DATE: userData.userDetails._HATCHIT_START_DATE?.split('T')[0] ?? "",
        _HATCHIT_REGULARIZATION_DATE: userData.userDetails._HATCHIT_REGULARIZATION_DATE?.split('T')[0] ?? "",
        _PROJECTS_INVOLVED: userData.userDetails._PROJECTS_INVOLVED ?? "",
        _HATCHIT_PASSIONS: userData.userDetails._HATCHIT_PASSIONS ?? "",
        _CUSTOM_INFORMATION: userData.userDetails._CUSTOM_INFORMATION ?? "",
      },
    };

    try {
      await UpdateUserData(userData._USER_ID, formattedData);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Profile updated successfully",
        life: 3000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update profile",
        life: 3000,
      });
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios(`http://localhost:3000/api/deleteUser/${userData._USER_ID}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Account deleted successfully",
          life: 3000,
        });
        Cookies.remove('token');
        dispatch(clearUserData());
        setTimeout(() => {
          router.push("/");
        }, 3000); // Delay to allow the toast message to be displayed
      } else {
        throw new Error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete account",
        life: 3000,
      });
    }
  };

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Toast ref={toast} />

      <Card className="w-full max-w-3xl">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Edit Your Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label htmlFor="_USERNAME" className="block text-sm font-medium text-gray-700">Username</label>
            <InputText id="_USERNAME" name="_USERNAME" value={userData._USERNAME ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._ADDRESS" className="block text-sm font-medium text-gray-700">Address</label>
            <InputText id="userDetails._ADDRESS" name="userDetails._ADDRESS" value={userData.userDetails._ADDRESS ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._BIRTHDATE" className="block text-sm font-medium text-gray-700">Birthdate</label>
            <InputText id="userDetails._BIRTHDATE" name="userDetails._BIRTHDATE" type="date" value={userData.userDetails._BIRTHDATE?.split('T')[0] ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._CONTACTNUMBER" className="block text-sm font-medium text-gray-700">Contact Number</label>
            <InputText id="userDetails._CONTACTNUMBER" name="userDetails._CONTACTNUMBER" value={userData.userDetails._CONTACTNUMBER ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._EMERGENCY_CONTACT_NAME" className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
            <InputText id="userDetails._EMERGENCY_CONTACT_NAME" name="userDetails._EMERGENCY_CONTACT_NAME" value={userData.userDetails._EMERGENCY_CONTACT_NAME ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._EMERGENCY_CONTACT_NUMBER" className="block text-sm font-medium text-gray-700">Emergency Contact Number</label>
            <InputText id="userDetails._EMERGENCY_CONTACT_NUMBER" name="userDetails._EMERGENCY_CONTACT_NUMBER" value={userData.userDetails._EMERGENCY_CONTACT_NUMBER ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._POSITION" className="block text-sm font-medium text-gray-700">Position</label>
            <InputText id="userDetails._POSITION" name="userDetails._POSITION" value={userData.userDetails._POSITION ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._COMPANY_EMAIL" className="block text-sm font-medium text-gray-700">Company Email</label>
            <InputText id="userDetails._COMPANY_EMAIL" name="userDetails._COMPANY_EMAIL" type="email" value={userData.userDetails._COMPANY_EMAIL ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._HIGHSCHOOL" className="block text-sm font-medium text-gray-700">High School</label>
            <InputText id="userDetails._HIGHSCHOOL" name="userDetails._HIGHSCHOOL" value={userData.userDetails._HIGHSCHOOL ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._COLLEGE" className="block text-sm font-medium text-gray-700">College</label>
            <InputText id="userDetails._COLLEGE" name="userDetails._COLLEGE" value={userData.userDetails._COLLEGE ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._ORGANIZATIONS" className="block text-sm font-medium text-gray-700">Organizations (one per line)</label>
            <InputTextarea
              id="userDetails._ORGANIZATIONS"
              name="userDetails._ORGANIZATIONS"
              value={userData.userDetails._ORGANIZATIONS ?? ""}
              rows={3}
              onChange={handleChange}
              required className="w-full"
            />
          </div>
          <div>
            <label htmlFor="userDetails._HATCHIT_START_DATE" className="block text-sm font-medium text-gray-700">Hatchit Start Date</label>
            <InputText id="userDetails._HATCHIT_START_DATE" name="userDetails._HATCHIT_START_DATE" type="date" value={userData.userDetails._HATCHIT_START_DATE?.split('T')[0] ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._HATCHIT_REGULARIZATION_DATE" className="block text-sm font-medium text-gray-700">Hatchit Regularization Date</label>
            <InputText id="userDetails._HATCHIT_REGULARIZATION_DATE" name="userDetails._HATCHIT_REGULARIZATION_DATE" type="date" value={userData.userDetails._HATCHIT_REGULARIZATION_DATE?.split('T')[0] ?? ""} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="userDetails._PROJECTS_INVOLVED" className="block text-sm font-medium text-gray-700">Projects Involved (one per line)</label>
            <InputTextarea
              id="userDetails._PROJECTS_INVOLVED"
              name="userDetails._PROJECTS_INVOLVED"
              value={userData.userDetails._PROJECTS_INVOLVED ?? ""}
              rows={3}
              onChange={handleChange}
              required className="w-full"
            />
          </div>
          <div>
            <label htmlFor="userDetails._HATCHIT_PASSIONS" className="block text-sm font-medium text-gray-700">Hatchit Passions (one per line)</label>
            <InputTextarea
              id="userDetails._HATCHIT_PASSIONS"
              name="userDetails._HATCHIT_PASSIONS"
              value={userData.userDetails._HATCHIT_PASSIONS ?? ""}
              rows={3}
              onChange={handleChange}
              required className="w-full"
            />
          </div>
          <div>
            <label htmlFor="userDetails._CUSTOM_INFORMATION" className="block text-sm font-medium text-gray-700">Custom Information</label>
            <InputTextarea
              id="userDetails._CUSTOM_INFORMATION"
              name="userDetails._CUSTOM_INFORMATION"
              value={userData.userDetails._CUSTOM_INFORMATION ?? ""}
              onChange={handleChange}
              rows={5}
              required className="w-full"
            />
          </div>
          <div className="flex justify-between">
            <Button type="submit" label="Save Changes" className="p-button p-button-primary" onClick={()=>setDialogVisible(true)} />
            <Button label="Delete Account" onClick={() => setDeleteDialogVisible(true)} className="p-button-outlined p-button-danger" />
          </div>
        </form>
      </Card>

      <Dialog 
        header="Delete Account" 
        visible={isDeleteDialogVisible} 
        style={{ width: '50vw' }} 
        onHide={() => setDeleteDialogVisible(false)}
      >
        <p className="m-0">
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </p>
        <div className="flex justify-end space-x-2">
          <Button label="Cancel" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="p-button-text" />
          <Button label="Delete Account" icon="pi pi-check" onClick={deleteAccount} className="p-button-danger" />
        </div>
      </Dialog>
    </div>
  );
}

function dispatch(arg0: { payload: undefined; type: "user/clearUserData"; }) {
  throw new Error("Function not implemented.");
}
