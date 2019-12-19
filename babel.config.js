module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      },
      'element-ui'
    ],
    [
      'import',
      {
        libraryName: 'view-design',
        libraryDirectory: 'src/components'
      },
      'iView'
    ]
  ]
}

// 单个引入
// plugins: [
//   [
//     'component',
//     {
//       libraryName: 'element-ui',
//       styleLibraryName: 'theme-chalk'
//     },
//     'element-ui'
//   ]
// ]
