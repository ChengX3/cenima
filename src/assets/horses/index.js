// 马的图片资源导入
import niuma from './niuma.jpg'
import bailongma from './bailongma.jpg'
import madongmei from './madongmei.jpg'
import mabee from './mabee.jpg'
import huangama from './huangama.jpg'
import daoma from './daoma.jpg'
import zhanma from './zhanma.jpg'
import aimashi from './aimashi.jpg'
import shoukuanma from './shoukuanma.jpg'
import makalong from './makalong.jpg'
import qianlima from './qianlima.jpg'
import hema from './hema.jpg'
import banma from './banma.jpg'
import shamate from './shamate.jpg'
import elema from './elema.jpg'

export const horseImages = {
  niuma,
  bailongma,
  madongmei,
  mabee,
  huangama,
  daoma,
  zhanma,
  aimashi,
  shoukuanma,
  makalong,
  qianlima,
  hema,
  banma,
  shamate,
  elema
}

export function getHorseImage(horseId) {
  return horseImages[horseId] || ''
}
