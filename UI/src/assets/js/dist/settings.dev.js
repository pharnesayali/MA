"use strict";

var settings = {
  api: "http://35.193.239.211:8080/ADF",
  // Windows Server
  //api: 'http://localhost:8090/ADF',
  headerName: 'Program',
  graphData: {
    host_url: 'https://10ay.online.tableau.com/',
    site_root: '/t/4cinnovationsdemo',
    view_name: 'AdvancedForecasting/Analysis',
    filter_nane: 'iid'
  },
  dashboard: false,
  version: '2021.11.02.01',
  Auto_Logout: 60,
  //In Min
  colorCode: {
    topHeader: '#FFFFFF',
    topHeaderAdvanced: '#003767',
    topHeaderForecasting: '#003767',
    header: 'linear-gradient(90deg, rgba(0,55,103,1) 37%, rgba(0,55,103,1) 70%, rgba(36,124,203,1) 100%)',
    footer: '',
    text: '#FFFFFF',
    boxButton: '#FFFFFF',
    boxButtonHover: '#8CC83c',
    boxButtonInnerView: '#003767',
    boxButtonInnerViewHover: '#FFFFFF',
    infoIcon: '#FFFFFF',
    userName: '#0073C3',
    logoutIcon: '#0073C3',
    //#55beff
    sideBarHeader: '',
    dropdownItem: '#FFFFFF',
    dropdownItemHover: '#003767',
    dropdownItemIcon: '#003767',
    dropdownItemName: '#003767',
    dropdownItemHoverIcon: '#FFFFFF',
    dropdownItemHoverName: '#FFFFFF'
  },
  environment: '4C-Development'
};