const ROLES_LIST = {
  Customer: parseInt(import.meta.env.VITE_ROLES_CUSTOMER, 10),
  Admin: parseInt(import.meta.env.VITE_ROLES_ADMIN, 10),
  Courier: parseInt(import.meta.env.VITE_ROLES_COURIER, 10),
  Editor: parseInt(import.meta.env.VITE_ROLES_EDITOR, 10),
};

export default ROLES_LIST;
