  export function Logo({style}  :{style?:string} ){
  return (
      <img src="/logo.png" alt="logo" className={style ? style :'my-5'}/>
  )
}
