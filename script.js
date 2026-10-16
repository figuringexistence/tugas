const slideRoot = document.getElementById("slide");
const counter = document.getElementById("counter");
const dotsRoot = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let current = 0;

const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[c]));

const slideContent = [
  {
    kicker:"Tugas Kelompok • Mata Kuliah Kemanusiaan dan Keimanan",
    title:"Hakikat Manusia dalam Perspektif Al-Qur’an",
    lead:"Analisis Dimensi Spiritual, Psikologis, Biologis, Sosial, dan Ekologis",
    meta:"Dosen Pengampu: Tian Khusni Akbar, M.Pd",
    cards:[
      ["KELOMPOK 4","Amalia Faradini — 202611010<br>Rahma Aurora Azzahro — 202611009<br>Dian Meicha — 202614010<br>Raka Puger Novalindo — 202611019<br>Yudi — 202614013"],
      ["IDENTITAS AKADEMIK","Program Studi TIF-Hukum Program Sarjana<br>Fakultas Sains dan Humaniora<br>Universitas Muhammadiyah Gombong • 2026"]
    ]
  },
  {
    kicker:"01 • Hakikat Manusia",
    title:"Manusia Menurut Al-Qur’an dan Islam",
    cards:[
      ["Makhluk ciptaan Allah","Manusia memiliki jasad, akal, hati, dan kemampuan untuk memilih serta mempertanggungjawabkan perbuatannya."],
      ["Tanggung jawab moral","Manusia diarahkan untuk beriman, beribadah, berbuat baik, dan menghindari tindakan yang merugikan."],
      ["Berbeda dari makhluk lain","Manusia dapat mengembangkan ilmu, membangun peradaban, membuat pertimbangan etis, dan menjalankan amanah."]
    ]
  },
  {
    kicker:"02 • Memahami Manusia secara Utuh",
    title:"Dimensi-Dimensi Manusia",
    cards:[
      ["SPIRITUAL","Hubungan dengan Allah dan keimanan.<br><b>Contoh:</b> salat dan bersyukur."],
      ["PSIKOLOGIS","Pikiran, perasaan, dan emosi.<br><b>Contoh:</b> mengendalikan emosi saat menghadapi masalah."],
      ["BIOLOGIS","Tubuh dan kebutuhan fisik.<br><b>Contoh:</b> makan bergizi, tidur cukup, berolahraga."],
      ["ANTROPOLOGIS","Budaya, identitas, dan peradaban.<br><b>Contoh:</b> melestarikan budaya serta mempelajari ilmu."],
      ["SOSIOLOGIS","Hubungan dengan masyarakat.<br><b>Contoh:</b> gotong royong dan menghormati perbedaan."],
      ["EKONOMI","Pemenuhan kebutuhan hidup.<br><b>Contoh:</b> bekerja halal, berhemat, dan bersedekah."],
      ["EKOLOGIS","Hubungan dengan alam.<br><b>Contoh:</b> mengurangi sampah dan menghemat air."]
    ]
  },
  {
    kicker:"03 • Keseimbangan Hidup",
    title:"Keterkaitan Antardimensi Manusia",
    cards:[
      ["Dimensi saling memengaruhi","Kesehatan fisik memengaruhi konsentrasi; kondisi psikologis memengaruhi hubungan sosial; nilai spiritual membantu mengarahkan keputusan."],
      ["Contoh dalam kehidupan mahasiswa","Belajar dengan baik membutuhkan kesehatan tubuh, pengelolaan emosi, kedisiplinan, motivasi, dan hubungan yang sehat dengan orang lain."],
      ["Dampak ketidakseimbangan","Terlalu mengejar prestasi tanpa istirahat dapat mengganggu kesehatan dan psikologis. Kebutuhan fisik, batin, sosial, dan tanggung jawab perlu dijaga bersama."]
    ]
  },
  {
    kicker:"04 • Amanah Manusia dalam Islam",
    title:"Manusia sebagai ‘Abdullah dan Khalifah",
    cards:[
      ["‘ABDULLAH • HAMBA ALLAH","Menjalankan ibadah, menaati perintah Allah, menjauhi larangan-Nya, dan menerapkan nilai Islam.<br><br><b>Contoh:</b> salat, berkata jujur, mencari rezeki halal, dan membantu orang yang membutuhkan."],
      ["KHALIFAH • PENGELOLA BUMI","Mengelola bumi secara bertanggung jawab, menegakkan keadilan, serta menjaga keseimbangan alam dan kehidupan sosial.<br><br><b>Contoh:</b> menjaga kebersihan, memakai sumber daya secara bijak, dan mengembangkan teknologi yang bermanfaat."]
    ],
    highlight:"Keduanya saling melengkapi: ibadah kepada Allah juga tercermin dalam sikap terhadap sesama dan lingkungan."
  },
  {
    kicker:"05 • Kontribusi Berdasarkan Nilai Islam",
    title:"Peran Manusia dalam Kehidupan Bermasyarakat",
    cards:[
      ["SOSIAL","Membantu tetangga<br>Gotong royong<br>Menghormati perbedaan<br>Menjenguk orang sakit"],
      ["EKONOMI","Bekerja secara halal<br>Berdagang dengan jujur<br>Menghormati hak pekerja<br>Membantu yang membutuhkan"],
      ["LINGKUNGAN","Mengurangi sampah<br>Menghemat energi dan air<br>Menanam pohon<br>Tidak merusak alam"]
    ],
    highlight:"Nilai utama: keadilan, amanah, kepedulian, dan tanggung jawab membantu membangun masyarakat yang harmonis, adil, dan sejahtera."
  },
  {
    kicker:"Kesimpulan • Kelompok 4",
    title:"Hakikat Manusia dalam Perspektif Al-Qur’an",
    lead:"Manusia dalam perspektif Islam merupakan ciptaan Allah SWT yang memiliki akal, hati, jasad, dan tanggung jawab. Dimensi spiritual, psikologis, biologis, antropologis, sosiologis, ekonomi, dan ekologis saling berkaitan dalam membentuk keseimbangan hidup.",
    highlight:"Sebagai ‘abdullah, manusia berkewajiban beribadah kepada Allah, sedangkan sebagai khalifah, manusia bertanggung jawab mengelola dan menjaga bumi. Karena itu, nilai-nilai Islam perlu diwujudkan melalui kejujuran, kepedulian sosial, usaha ekonomi yang halal, serta pelestarian lingkungan agar manusia dapat memberikan manfaat bagi diri sendiri, masyarakat, dan alam sekitar."
  }
];

function render(){
  const s = slideContent[current];
  counter.textContent = `${String(current+1).padStart(2,"0")} / ${String(slideContent.length).padStart(2,"0")}`;
  let html = `<div class="kicker">${s.kicker}</div><h2>${s.title}</h2>`;
  if(s.lead) html += `<p class="lead">${s.lead}</p>`;
  if(s.meta) html += `<p class="meta">${s.meta}</p>`;
  if(s.cards) html += `<div class="cards">${s.cards.map(c=>`<article class="card"><h3>${c[0]}</h3><p>${c[1]}</p></article>`).join("")}</div>`;
  if(s.highlight) html += `<div class="highlight">${s.highlight}</div>`;
  slideRoot.innerHTML = html;
  prevBtn.disabled = current===0;
  nextBtn.disabled = current===slideContent.length-1;
  [...dotsRoot.children].forEach((d,i)=>{d.classList.toggle("active",i===current);d.setAttribute("aria-current",i===current?"step":"false")});
}
slideContent.forEach((_,i)=>{
  const b=document.createElement("button");
  b.className="dot"; b.type="button"; b.setAttribute("aria-label",`Buka slide ${i+1}`);
  b.addEventListener("click",()=>{current=i;render()}); dotsRoot.appendChild(b);
});
prevBtn.addEventListener("click",()=>{if(current>0){current--;render()}});
nextBtn.addEventListener("click",()=>{if(current<slideContent.length-1){current++;render()}});
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight"&&current<slideContent.length-1){current++;render()}
  if(e.key==="ArrowLeft"&&current>0){current--;render()}
});
render();
