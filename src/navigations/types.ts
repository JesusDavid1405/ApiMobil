
export type RootParamList = {
  //Roles
  Rol: undefined;
  RolEdit: {Id: number | string};
  RolCreate: undefined;

  // Formulario
  Form: undefined;
  FormEdit: {Id: number | string};
  FormCreate: undefined;

  // Módulo
  Module: undefined;
  ModuleEdit: {Id: number | string};
  ModuleCreate: undefined;

  // Person
  Person: undefined;
  PersonCreate: undefined;
  PersonEdit: {Id: number | string};

  // Permission
  Permission: undefined;
  PermissionCreate: undefined;
  PermissionEdit: {Id: number | string};

  // User
  User: undefined;
  UserCreate: undefined;
  UserEdit: {Id: number | string};

  RolUser: undefined;
  FormModule: undefined;
  RolFormPermission: undefined;

};

export type RoltackParamsList = {
  RolList: undefined;
  RolUpdate: {id: string};
  RolRegister: undefined;
}

export type FormtackParamsList = {
  FormList: undefined;
  FormUpdate: {id: string};
  FormRegister: undefined;
}

export type ModuletackParamsList = {
  ModuleList: undefined;
  ModuleUpdate: {id: string};
  ModuleRegister: undefined;
}
