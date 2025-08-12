
export type RootParamList = {
  Rol: undefined;
  Form: undefined;
  Module: undefined;
  User: undefined;
  Permission: undefined;
  Person: undefined;
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
