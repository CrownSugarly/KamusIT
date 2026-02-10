// Ambil elemen HTML
const container = document.getElementById('dictionary-container');
const searchBox = document.getElementById('searchBox');
let termsData = [];

// Fungsi ambil data
async function loadTerms() {
    const response = await fetch('assets/data/terms.json');
    termsData = await response.json();
    renderTerms(termsData);
}

// Fungsi tampilkan data ke layar
function renderTerms(data) {
    container.innerHTML = data.map(item => `
        <div class="card">
            <h3 class="term">${item.term} <span class="category">${item.category}</span></h3>
            <p>${item.definition}</p>
        </div>
    `).join('');
}

// Fitur Pencarian
searchBox.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = termsData.filter(item => 
        item.term.toLowerCase().includes(keyword) || 
        item.definition.toLowerCase().includes(keyword)
    );
    renderTerms(filtered);
});

// Jalankan saat loading selesai
loadTerms();
