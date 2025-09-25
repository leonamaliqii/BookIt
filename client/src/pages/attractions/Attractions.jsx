import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./attractions.css";

const Attractions = () => {
  return (
    <div>
      <Navbar />
      <Header page="attractions" />

      <div className="attractionsSection">
        <h1>Discover Attractions & Things To Do</h1>
        <p>Explore Kosovo’s most beautiful places and experiences</p>

        <div className="attractionsCards">
          {/* Card 1 */}
      <div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758812994/-640-0-kompleksi-adem-jashari-1678001718_n06zuy.jpg" 
    alt="Prekazi Heroik"
  />
  <h2>Prekazi Heroik</h2>
  <p className="attractionCity">Prekaz</p>
  <p className="attractionAddress">Rruga Adem e Hamëz Jashari
41000 </p>
  <p className="attractionDesc">
    Prekaz is known for its heroic role during the Kosovo War and is a symbol of resistance and national pride. Visitors can explore the Jashari family compound and learn about the country’s struggle for freedom.
  </p>
</div>

 {/* Card 2 */}

           <div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758813358/kalaja-e-prizrenit-castle-of-prizren-v0-0d8dbxf42dj81_cr10nd.jpg"
    alt="Kalaja e Prizrenit"
  />
  <h2>Kalaja e Prizrenit</h2>
  <p className="attractionCity">Prizren</p>
  <p className="attractionAddress">Kalaja e Prizrenit, Prizren, Kosovo</p>
  <p className="attractionDesc">
    Kalaja e Prizrenit, or Prizren Fortress, is a historic hilltop fortification in Kosovo, offering panoramic views of the city and surrounding landscapes. 
  </p>
</div>



          {/* Card 3 */}
<div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758813730/733e8aac-a822-43fb-9fe6-8274cab64cc6-988725_699127283448652_1103114266_n_x26rk9.jpg"
    alt="Kosovo Museum"
  />
  <h2>Muzeu kombëtar i Kosovës</h2>
  <p className="attractionCity">Pristina</p>
  <p className="attractionAddress">1 Hamdi Mramori, Prishtina 10000</p>
  <p className="attractionDesc">
    The Kosovo Museum, established in 1949, is the national museum of Kosovo, located in the city of Pristina. 
  </p>
</div>



          {/* Card 3 */}



          {/*card 4*/}

         
          <div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758813122/Uj_C3_ABvara_e_Mirush_C3_ABs_ucxtdj.jpg"
    alt="Ujëvara e Mirushës"
  />
  <h2>Ujëvara e Mirushës</h2>
  <p className="attractionCity">Mirusha</p>
  <p className="attractionAddress">Mirusha Park, Kosovo</p>
  <p className="attractionDesc">
    Ujëvara e Mirushës is a stunning series of 12 waterfalls and 16 lakes carved by the Mirusha River, offering opportunities for swimming, hiking, and photography.
  </p>
</div>

{/*card5*/}
<div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758812658/7889046558_d3b3f6c256_b_uxbkp3.jpg"
    alt="Gryka e Rugovës"
  />
  <h2>Gryka e Rugovës</h2>
  <p className="attractionCity">Peja</p>
  <p className="attractionAddress">Rugova Canyon, Peja, Kosovo</p>
  <p className="attractionDesc">
    Gryka e Rugovës is famous for its rugged landscapes, crystal-clear rivers, and diverse flora and fauna, making it ideal for hiking, rock climbing, and nature photography.
  </p>
</div>

{/*card6*/}
<div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758814168/Drini_i_bardhe_1_icvhhj.jpg"
    alt="Drini i Bardhë Waterfall"
  />
  <h2>Drini i Bardhë</h2>
  <p className="attractionCity">Peja</p>
  <p className="attractionAddress">Radavc, Peja, Kosovo</p>
  <p className="attractionDesc">
    Drini i Bardhë, or White Drin Waterfall, is a stunning 25-meter waterfall located at the mouth of the White Drin River in Radavc, near Peja. 
  </p>
</div>

{/*card7*/}
<div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758814422/germiaaaaa_wzrdph.jpg"
    alt="Gërmia Park"
  />
  <h2>Gërmia Park</h2>
  <p className="attractionCity">Prishtina</p>
  <p className="attractionAddress">Rr. Dr. Shpëtim Robaj</p>
  <p className="attractionDesc">
    Gërmia Park is a protected regional park located in the northeast of Prishtina, covering an area of 62 km². 
  </p>
</div>


<div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758815353/sheshi_vuexxh.jpg"
    alt="Sheshi Nënë Tereza"
  />
  <h2>Sheshi Nënë Tereza</h2>
  <p className="attractionCity">Prishtina</p>
  <p className="attractionAddress">Sheshi Nënë Tereza, 10000 Prishtina, Kosovo</p>
  <p className="attractionDesc">
    Sheshi Nënë Tereza is a central square in Prishtina dedicated to Mother Teresa, featuring monuments, fountains, and a lively space for locals and tourists to gather and enjoy the city’s vibrant atmosphere.
  </p>
</div>

<div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758815527/new-born-prishtina-_bcmwvv.jpg"
    alt="Newborn Monument"
  />
  <h2>Newborn Monument</h2>
  <p className="attractionCity">Prishtina</p>
  <p className="attractionAddress">Rr.Luan Haradinaj, Prishtina 10000</p>
  <p className="attractionDesc">
    The Newborn Monument was unveiled on Kosovo’s independence day in 2008. It symbolizes freedom and national pride and is a must-see for visitors exploring the heart of Prishtina.
  </p>
</div>



<div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758814796/32101_756066_nht7so.webp"
    alt="Brezovica Ski Resort"
  />
  <h2>Brezovica Ski Resort</h2>
  <p className="attractionCity">Brezovica</p>
  <p className="attractionAddress">Rruga e Brezovicës, Shtërpcë, 73000</p>
  <p className="attractionDesc">
    Brezovica Ski Resort, located in the Šar Mountains, is Kosovo’s top winter destination. It features slopes for all skill levels and is popular for skiing, snowboarding, and mountain adventures.
  </p>
</div>



<div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758815065/96jbl002hja71_cjs8vk.jpg"
    alt="Prevalla"
  />
  <h2>Prevalla</h2>
  <p className="attractionCity">Prizren</p>
  <p className="attractionAddress">R115, Prevalla, Prizren, Kosovo, 20000</p>
  <p className="attractionDesc">
    Prevalla is a mountain resort located in the Šar Mountains, popular for hiking, picnics, and winter sports. Its natural beauty and fresh air make it a favorite getaway for locals and tourists.
  </p>
</div>

<div className="attractionCard">
  <img
    src="https://res.cloudinary.com/dicr6ysyv/image/upload/v1758815794/ski-boga-kosovo_gs5p6r.jpg"
    alt="Bogë Ski Center"
  />
  <h2>Bogë Ski Center</h2>
  <p className="attractionCity">Bogë</p>
  <p className="attractionAddress">Bogë, Pejë, Kosovo</p>
  <p className="attractionDesc">
    Bogë Ski Center is a charming resort nestled in the Rugova Mountains, offering 3 km of slopes suitable for beginners and intermediate skiers. The area is renowned for its serene atmosphere and breathtaking alpine views.
  </p>
</div>
    </div>
      </div>

      <Footer />
    </div>
  );
};

export default Attractions;

