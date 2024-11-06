import { useEffect } from "react";
import { useDepartmentContext } from "../context/DepartmentContext";
import { blog, employee, menu, user, crud } from "../utils/mock";

export const admin = () => {
  const {
    sidebarDepartment,
    getSidebarDepartment,
    isCreateDepartmentType,
    isDeleteDepartmentType,
  } = useDepartmentContext();

  useEffect(() => {
    getSidebarDepartment();
  }, [isCreateDepartmentType, isDeleteDepartmentType]);

  return [
    // admin
    {
      id: 1,
      path: "pages",
      title: "Sahifalar",
      roles: ["admin"],
      icon: "nav-icon fa fa-file",
    },
    {
      id: 2,
      title: "Menu",
      roles: ["admin"],
      data: menu,
      icon: "nav-icon fas fa-bars",
    },
    {
      id: 3,
      title: "Blog",
      roles: ["admin"],
      icon: "nav-icon fas fa-blog",
      data: blog,
    },
    {
      id: "3-1",
      title: "Yangiliklar",
      roles: ["moderatorcontent"],
      icon: "nav-icon fas fa-newspaper",
      path: "blog/news",
    },
    {
      id: "3-2",
      title: "Blog",
      roles: ["moderatorcontent"],
      icon: "nav-icon fas fa-bold",
      path: "blog/blog",
    },
    {
      id: "3-3",
      title: "Tadbirlar",
      roles: ["moderatorcontent"],
      icon: "nav-icon fas fa-list",
      path: "blog/events",
    },
    {
      id: 4,
      title: "Employee",
      roles: ["admin"],
      data: employee,
      icon: "nav-icon fas fa-users",
    },
    {
      id: 5,
      title: "Depaerment",
      roles: ["admin"],
      icon: "nav-icon fas fa-building",
      data: [
        { label: "Department Type", path: "departmenttype" },
        ...sidebarDepartment,
      ],
    },
    {
      id: 6,
      title: "User",
      roles: ["admin"],
      data: user,
      icon: "nav-icon fas fa-users-gear",
    },
    {
      id: 7,
      title: "CRUD",
      roles: ["admin"],
      data: crud,
      icon: "nav-icon fas fa-edit",
    },
    // teacher
    {
      id: 8,
      path: "import-doc",
      title: "110 ball",
      roles: ["teacher", "headdepartment"],
      icon: "nav-icon fa fa-file-import",
    },
    {
      id: 9,
      path: "confirm-teacher-110",
      title: "O'qituvchi 110 tasdiqlash",
      roles: ["headdepartment"],
      icon: "nav-icon fa-solid fa-user-check",
    },
    {
      id: 10,
      path: "study-department",
      title: "O'qituvchilarni baholash",
      roles: ["studydepartment"],
      icon: "nav-icon fa-solid fa-ranking-star",
    },
    {
      id: 11,
      path: "appeals",
      title: "Murojaatlar",
      roles: ["virtualreception", "admin"],
      icon: "nav-icon fa-solid fa-users",
    },
    {
      id: 12,
      path: "faculty-council",
      title: "O'qituvchilarni baholash",
      roles: ["facultycouncil", "dean"],
      icon: "nav-icon fa-solid fa-ranking-star",
    },
    {
      id: "12-1",
      path: "department",
      title: "Bo'lim ma'lumotlari",
      roles: ["dean", "deputydean", "headdepartment", "director"],
      icon: "nav-icon fa-solid fa-building",
    },
    {
      id: 19,
      title: "O'qituvchilarni faoliyatini tasdiqlash",
      roles: ["headdepartment"],
      icon: "nav-icon fa-solid fa-check-to-slot",
      data: [
        { id: 1, title: "Portfolio", path: "confirm-portfolio" },
        { id: 2, title: "Blog", path: "confirm-blog" },
        { id: 3, title: "Tadjriba", path: "confirm-exprience" },
        { id: 4, title: "Ilmiy Faoliyari", path: "confirm-science" },
      ],
    },
    {
      id: 14,
      path: "experience",
      title: "Tadjribasi",
      roles: [
        "teacher",
        "dean",
        "rector",
        "via-rector",
        "deputydean",
        "headdepartment",
        "director",
        "Staff",
      ],
      icon: "nav-icon fa fa-history",
    },
    {
      id: 13,
      path: "portfolio",
      title: "Portfolio",
      roles: [
        "teacher",
        "dean",
        "rector",
        "via-rector",
        "deputydean",
        "headdepartment",
        "director",
        "Staff",
      ],
      icon: "nav-icon fas fa-briefcase",
    },
    {
      id: 15,
      path: "blog",
      title: "Blog",
      roles: [
        "teacher",
        "dean",
        "rector",
        "via-rector",
        "deputydean",
        "headdepartment",
        "director",
        "Staff",
      ],
      icon: "nav-icon fa-solid fa-blog",
    },
    {
      id: 16,
      path: "scientific-activity",
      title: "Ilmiy faoliyati",
      roles: [
        "teacher",
        "dean",
        "rector",
        "via-rector",
        "deputydean",
        "headdepartment",
        "director",
        "Staff",
      ],
      icon: "nav-icon fas fa-edit",
    },
    {
      id: 18,
      title: "Boshqaruv",
      roles: ["moderatorcontent"],
      icon: "nav-icon fa fa-cog",
      data: [{ id: 1, title: "Rektorat", path: "rectorat" }],
    },
    {
      id: 20,
      title: "Ma'lumotlarim",
      path: "my-data",
      roles: ["headdepartment", "teacher"],
      icon: "nav-icon fas fa-database",
    },
  ];
};
