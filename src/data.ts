export interface ShoeWidthData {
  rank: number | string;
  brand: string;
  series: string;
  widthMm: number;
  widthLevel: string;
  source: string;
  category: 'barefoot' | 'athletic' | 'casual';
  fitType: 'anatomical' | 'volume';
  imageUrl: string;
}

export const shoeWidthData: ShoeWidthData[] = [
  {
    rank: 1,
    brand: 'Realfoot',
    series: 'Trek / 仿生款',
    widthMm: 120,
    widthLevel: '真·宽楦之王',
    source: '实测 120mm',
    category: 'barefoot',
    fitType: 'anatomical',
    imageUrl: 'https://images.weserv.nl/?url=raw.githubusercontent.com/Realfoot-shoes/Web-Assets/main/Trek_Grey.jpg'
  },
  {
    rank: 2,
    brand: 'Joe Nimble',
    series: 'Nimbletoes',
    widthMm: 115,
    widthLevel: '4E+ (天花板)',
    source: 'Joe Nimble 官方',
    category: 'barefoot',
    fitType: 'anatomical',
    imageUrl: 'https://images.weserv.nl/?url=www.joe-nimble.com/cdn/shop/products/Joe-Nimble-Nimbletoes-Black-01.jpg&w=800'
  },
  {
    rank: 3,
    brand: 'Be Lenka',
    series: 'Royal / Champ',
    widthMm: 112,
    widthLevel: '4E+ (极宽)',
    source: 'Barefoot Universe',
    category: 'barefoot',
    fitType: 'anatomical',
    imageUrl: 'https://images.weserv.nl/?url=www.belenka.com/images/products/be-lenka-barefoot-shoes-royal-white-beige.jpg&w=800'
  },
  {
    rank: 4,
    brand: 'Lems Shoes',
    series: 'Primal 2',
    widthMm: 110,
    widthLevel: '4E+ (极宽)',
    source: 'Lems 官方',
    category: 'barefoot',
    fitType: 'anatomical',
    imageUrl: 'https://images.weserv.nl/?url=cdn.shopify.com/s/files/1/0211/9482/products/Primal-2-Black-1_2000x.jpg&w=800'
  },
  {
    rank: 5,
    brand: 'Bohempia',
    series: 'Orik (Wide Fit)',
    widthMm: 108,
    widthLevel: '4E+ (极宽)',
    source: 'Barefoot Universe',
    category: 'casual',
    fitType: 'anatomical',
    imageUrl: 'https://images.weserv.nl/?url=www.bohempia.com/images/products/orik-red-white_1.jpg&w=800'
  },
  {
    rank: 6,
    brand: 'New Balance',
    series: '1080 v13 (4E)',
    widthMm: 106,
    widthLevel: '4E (加宽楦)',
    source: 'NB 官方',
    category: 'athletic',
    fitType: 'volume',
    imageUrl: 'https://images.weserv.nl/?url=nb.scene7.com/is/image/NB/m1080k13_nb_02_i&w=800'
  },
  {
    rank: 7,
    brand: 'Altra',
    series: 'Lone Peak 8',
    widthMm: 105,
    widthLevel: '顶级解剖学宽楦',
    source: 'RunRepeat',
    category: 'athletic',
    fitType: 'anatomical',
    imageUrl: 'https://images.weserv.nl/?url=images.altrafootwear.com/is/image/Altra/AL0A85NC_252_HERO&w=800'
  },
  {
    rank: 8,
    brand: 'Asics',
    series: 'Gel-Kayano 31 (4E)',
    widthMm: 105,
    widthLevel: '4E 加宽',
    source: 'Asics 官方',
    category: 'athletic',
    fitType: 'volume',
    imageUrl: 'https://images.weserv.nl/?url=images.asics.com/is/image/asics/1011B868_001_SR_RT_GLB&w=800'
  },
  {
    rank: 9,
    brand: 'Brooks',
    series: 'Ghost 16 (4E)',
    widthMm: 104,
    widthLevel: '4E (加宽楦)',
    source: 'Brooks 官方',
    category: 'athletic',
    fitType: 'volume',
    imageUrl: 'https://images.weserv.nl/?url=www.brooksrunning.com/dw/image/v2/BGPF_PRD/on/demandware.static/-/Sites-brooks-master-catalog/default/dw837fd44d/images/footwear/110393/110393_001_l_angle.jpg&w=800'
  },
  {
    rank: 10,
    brand: 'Topo Athletic',
    series: 'Ultraventure 3',
    widthMm: 102,
    widthLevel: '解剖学宽头',
    source: 'Topo 官方',
    category: 'athletic',
    fitType: 'anatomical',
    imageUrl: 'https://images.weserv.nl/?url=www.topoathletic.com/dw/image/v2/BGPF_PRD/on/demandware.static/-/Sites-topo-master-catalog/default/dw385e2b02/images/footwear/M054/M054_FORREST_ORANGE_1.jpg&w=800'
  },
  {
    rank: 11,
    brand: 'Saucony',
    series: 'Triumph 21 (2E)',
    widthMm: 101,
    widthLevel: '2E 加宽',
    source: 'RunRepeat',
    category: 'athletic',
    fitType: 'volume',
    imageUrl: 'https://images.weserv.nl/?url=www.saucony.com/dw/image/v2/BCYQ_PRD/on/demandware.static/-/Sites-saucony-master-catalog/default/dw769503ea/images/footwear/triumph-21/S20881-10_1.jpg&w=800'
  },
  {
    rank: 12,
    brand: 'Mizuno',
    series: 'Wave Rider 27 (SW)',
    widthMm: 99,
    widthLevel: 'SW 超宽楦',
    source: 'Mizuno 官方',
    category: 'athletic',
    fitType: 'volume',
    imageUrl: 'https://images.weserv.nl/?url=mizunousa.scene7.com/is/image/mizunousa/411425_9090_01&w=800'
  },
  {
    rank: 13,
    brand: 'Vivobarefoot',
    series: 'Primus Lite III',
    widthMm: 97,
    widthLevel: '足形款',
    source: 'Vivobarefoot',
    category: 'barefoot',
    fitType: 'anatomical',
    imageUrl: 'https://images.weserv.nl/?url=images.vivobarefoot.com/is/image/vivobarefoot/300160-22_1&w=800'
  },
  {
    rank: 14,
    brand: 'Adidas',
    series: 'Boston 13 (Wide)',
    widthMm: 98,
    widthLevel: '专业运动',
    source: 'Adidas 官方',
    category: 'athletic',
    fitType: 'volume',
    imageUrl: 'https://images.weserv.nl/?url=assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0150d18ce42643a68282713f8903e911_9366/Adizero_Boston_12_Shoes_Black_IG3328_01_standard.jpg&w=800'
  },
  {
    rank: 15,
    brand: 'Bmai (必迈)',
    series: '42K Pro (宽版)',
    widthMm: 97,
    widthLevel: 'D+ 宽度',
    source: '实测数据',
    category: 'athletic',
    fitType: 'volume',
    imageUrl: 'https://images.weserv.nl/?url=img.codoon.com/goods/image/20210312154502598634.jpg&w=800'
  },
  {
    rank: 16,
    brand: 'Nike',
    series: 'Pegasus 40 (Wide)',
    widthMm: 95,
    widthLevel: '加宽楦 (仍窄)',
    source: 'Nike 官方',
    category: 'athletic',
    fitType: 'volume',
    imageUrl: 'https://images.weserv.nl/?url=static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f8f96e4c-1d96-48c6-a6a3-6eb8f2e24d77/AIR+ZOOM+PEGASUS+40.png&w=800'
  },
  {
    rank: 17,
    brand: 'On',
    series: 'Cloudmonster',
    widthMm: 94,
    widthLevel: '标准偏窄',
    source: 'On 官方',
    category: 'athletic',
    fitType: 'volume',
    imageUrl: 'https://images.weserv.nl/?url=images.ctfassets.net/898d9y1_cloud_monster_black_white_1_600x600.png&w=800'
  }
];
