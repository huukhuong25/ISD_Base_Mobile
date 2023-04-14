export interface UserModel {
  accountId: string;
  token: string;
  userName: string;
  employeeCode: string;
  fullName: string;
  validaty: string;
  refreshToken: string;
  companyId: string;
  emailId: any;
  role: string;
  roleName: any;
  roles: string;
  vendorCode: any;
  vendorName: any;
  plantCode: any;
  plantName: any;
  saleOrgCode: any;
  saleOrgName: any;
  companyCode: any;
  companyName: any;
  expiredTime: string;
  permission: Permission;
  webPermission: WebPermission;
}

export interface Permission {
  mobileScreenModel: MobileScreenModel[];
  menuModel: MenuModel[];
  mobileScreenPermissionModel: MobileScreenPermissionModel[];
}

export interface MobileScreenModel {
  mobileScreenId: string;
  screenName: string;
  screenCode: string;
  menuId: string;
  iconType: any;
  iconName: any;
  orderIndex: number;
  functions: any[];
}

export interface MenuModel {
  menuId: string;
  menuName: string;
  moduleId: any;
  icon: string;
  orderIndex: number;
  pages: any;
  mobileScreens: any;
}

export interface MobileScreenPermissionModel {
  rolesId: string;
  mobileScreenId: string;
  functionId: string;
}

export interface WebPermission {
  pageModel: PageModel[];
  menuModel: MenuModel2[];
  pagePermissionModel: PagePermissionModel[];
  moduleModel: ModuleModel[];
}

export interface PageModel {
  pageId: string;
  pageName: string;
  pageUrl: string;
  parameter: any;
  moduleId?: string;
  menuId: string;
  orderIndex: number;
  domainConfig: number;
  domainConfigUrl: string;
}

export interface MenuModel2 {
  menuId: string;
  menuName: string;
  moduleId: any;
  icon: string;
  orderIndex: number;
  pages: any;
  mobileScreens: any;
}

export interface PagePermissionModel {
  pageId: string;
  functionId: string;
}

export interface ModuleModel {
  moduleId: string;
  moduleName: string;
  icon?: string;
  isSystemModule: boolean;
  orderIndex: any;
  imageUrl: any;
  description: any;
  details: any;
  url: any;
  rowIndex: number;
  error: any;
  isNullValueId: boolean;
  menuId: string;
  menuName: any;
  activedMenuList: any;
  pageList: any;
  activedPageList: any;
  pageId: string;
  pageName: any;
}
