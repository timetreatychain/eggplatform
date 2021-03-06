import Vue from 'vue'
import Router from 'vue-router'


import AdvancedSetting from '../components/userCenter/advancedSetting.vue'
import KycSetting from '../components/userCenter/kycSetting.vue'
import WalletSetting from '../components/sdk/walletSetting.vue'
import RealNameAuthentication from '../components/userCenter/realNameAuthentication.vue'
import RealNameAuthenticationVip from '../components/userCenter/realNameAuthenticationVip.vue'
import Authenticator from '../components/userCenter/authenticator.vue'
import Verification from '../components/userCenter/verification.vue'
import Otc from '../components/userCenter/otc.vue'

import Egg from '../components/sdk/sdk.vue'
import loginOtc from '../components/sdk/loginOtc'
import bindOtc from '../components/sdk/bindOtc'
import manageOtc from '../components/sdk/manageOtc'
import authorizationBinding from '../components/sdk/authorizationBinding'
import NoticeList from '../components/sdk/noticeList.vue'
import Notice from '../components/sdk/notice.vue'
import User from '../components/sdk/User.vue'
import UserNormal from '../components/sdk/UserNormal.vue'
import blockIdentityAuthentication from '../components/sdk/qksfrz'
import PayTTC from '../components/userCenter/payTTC.vue'
import Browser from '../components/userCenter/browser.vue'

import GetCoinSetting from '../components/userCenter/getCoinSetting.vue'


import currencyRecord from '../components/sdk/currencyRecord.vue'
import myAssets from '../components/sdk/myAssets'
import currency from '../components/sdk/currency.vue'
import tibidetail from '../components/sdk/tibidetail.vue'
import blockIdentity from '../components/sdk/blockIdentity.vue'
import setpassword from '../components/sdk/setpassword'
import applyReg from '../components/sdk/applyidenty'
import bindingBlockIdentity from '../components/sdk/bindingBlockIdentity'
import findpassword from '../components/sdk/findpassword'
import findBlockId from '../components/sdk/findBlockId'
import resetPassword from '../components/sdk/resetPassword'
import EggActivity from '../components/activity/activity1'
import lottery from '../components/activity/lottery'
import EggActivityAg from '../components/activity/activity2'
import activityReward from '../components/officialWeb/activityReward'

import UserEdit from '../components/userCenter/userEdit.vue'
import * as PhotoClip from "../common/js/PhotoClip.js"

import Maintain from '../components/update'
import officialWeb from '../components/officialWeb/index'
import publicweb from '../components/officialWeb/publicweb'
import eggSociety from '../components/officialWeb/egg-society'
import eggNews from '../components/officialWeb/eggNews'
import eggNewsDetails from '../components/officialWeb/eggNewsDetails'
import linkUs from '../components/officialWeb/linkus'
import publicNotice from '../components/officialWeb/publicNotice'
import Raiders from '../components/officialWeb/Raiders'
import systemIntroduction from '../components/officialWeb/systemIntroduction'
import productDesciption from '../components/officialWeb/productDesciption'
import Download from '../components/download'
import Activityends from '../components/activityends'

import Newactivity0 from '../components/activity/new_activity'
import Newsactivity from '../components/activity/share-activity'
import coinActivity from '../components/activity/coin-activity'
import inviteActivity from '../components/activity/inviteActivity'

Vue.use(Router)
export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          x: 0,
          y: 0
        })
      }, 10)
    })
  },
  mode: 'history',
  routes: [{
    path: '/',
    name: "egg",
    component: Egg
  }, {
    path: '/userEdit',
    name: "UserEdit",
    component: UserEdit
  }, {
    path: '/noticeList',
    name: "NoticeList",
    component: NoticeList
  }, {
    path: '/notice',
    name: "Notice",
    component: Notice
  }, {
    path: '/currencyRecord',
    name: "currencyRecord",
    component: currencyRecord,
  },
  {
    path: '/currency',
    name: "currency",
    component: currency,
  },
  {
    path: '/browser',
    name: "Browser",
    component: Browser,
  },
  {
    path: '/tibidetail/:id', //提币详情
    name: "tibidetail",
    component: tibidetail,
  },
  {
    path: '/walletSetting', //提币详情
    name: "WalletSetting",
    component: WalletSetting,
  },
  {
    path: '/egg',
    name: "egg",
    component: Egg
  }, {
    path: '/advancedSetting',
    name: "AdvancedSetting",
    component: AdvancedSetting
  },
  {
    path: '/otc',
    name: "Otc",
    component: Otc
  },
  {
    path: '/getCoinSetting',
    name: "GetCoinSetting",
    component: GetCoinSetting
  },


  {
    path: '/kycSetting',
    name: "KycSetting",
    component: KycSetting
  },

  {
    path: '/verification',
    component: Verification
  },
  {
    path: '/EggActivity',
    component: EggActivity
  },
  {
    path: '/EggActivityAg',
    component: EggActivityAg
  },
  {
    path: '/realNameAuthenticationVip',
    name: "RealNameAuthenticationVip",
    component: RealNameAuthenticationVip
  },
  {
    path: '/realNameAuthentication',
    name: "RealNameAuthentication",
    component: RealNameAuthentication
  }, {
    path: '/authenticator',
    component: Authenticator
  }, {
    path: '/user',
    name: "User",
    component: User
  }, {
    path: '/userNormal',
    name: "userNormal",
    component: UserNormal
  },
  {
    path: '/payttc',
    name: "PayTTC",
    component: PayTTC
  },
  {
    path: '/update',
    name: "update",
    component: Maintain
  },
  {
    path: '/download',
    name: "download",
    component: Download
  },
  {
    path: '/activityends',
    name: 'activityends',
    component: Activityends
  },
  {
    path: '/newactivity',
    name: 'Newactivity0',
    component: Newactivity0
  },
  {
    path: '/newsactivity',
    name: 'newsactivity',
    component: Newsactivity
  },
  {
    path: '/officialWeb',
    name: 'officialWeb',
    component: officialWeb
  },
  {
    path: '/coinActivity',
    name: 'coinActivity',
    component: coinActivity
  },
  {
    path: '/publicWeb',
    name: 'publicweb',
    component: publicweb
  },
  {
    path: '/eggSociety',
    name: 'egg-society',
    component: eggSociety
  },
  {
    path: '/eggNews',
    name: 'eggNews',
    component: eggNews
  },
  {
    path: '/eggNewsDetails/:id',
    name: 'eggNewsDetails',
    component: eggNewsDetails
  },
  {
    path: '/linkUs',
    name: 'linkus',
    component: linkUs
  },
  {
    path: '/publicNotice',
    name: 'publicNotice',
    component: publicNotice
  },
  {
    path: '/Raiders',
    name: 'Raiders',
    component: Raiders
  },
  {
    path: '/systemIntroduction',
    name: 'systemIntroduction',
    component: systemIntroduction
  },
  {
    path: '/productDesciption',
    name: 'productDesciption',
    component: productDesciption
  },
  {
    path: '/inviteActivity',
    name: 'inviteActivity',
    component: inviteActivity
  },
  {
    path: '/blockIdentity',
    name: 'blockIdentity',
    component: blockIdentity
  },
  {
    path: '/applyReg',
    name: 'applyReg',
    component: applyReg
  },
  {
    path: '/bindingBlockIdentity',
    component: bindingBlockIdentity
  },
  {
    path: '/blockIdentityAuthentication',
    component: blockIdentityAuthentication
  },
  {
    path: '/setpassword',
    component: setpassword
  },
  {
    path: '/findpassword',
    component: findpassword
  },
  {
    path: '/findBlockId',
    component: findBlockId
  },
  {
    path: '/resetPassword',
    component: resetPassword
  },
  {
    path: '/authorizationBinding',
    component: authorizationBinding
  },
  {
    path: '/loginOtc',
    component: loginOtc
  },
  {
    path: '/manageOtc',
    component: manageOtc
  },
  {
    path: '/bindOtc',
    component: bindOtc
  },
  {
    path: '/activityReward',
    component: activityReward
  },
  {
    path: '/myAssets',
    component: myAssets
  },
  {
    path: '/lottery',
    component: lottery
  },












  ],
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})
