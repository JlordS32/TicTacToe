const Menu = () => {
   return (
      <div className="container">
         <div className="logo">
            <img src="/images/logo.svg" alt="Logo" />
            <div>
               <h3>Pick the player 1's mark</h3>
               <div className="playerSelector">
                  <div></div>
                  <div></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Menu;
