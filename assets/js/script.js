const container = document.getElementById('dictionary-container');
const searchBox = document.getElementById('searchBox');
const stats = document.getElementById('stats');
let termsData = [];

async function loadTerms() {
    try {
        const response = await fetch('assets/data/terms.json');
        const rawData = await response.json();
        
        // Urutkan A-Z secara otomatis
        termsData = rawData.sort((a, b) => a.term.localeCompare(b.term));
        
        renderTerms(termsData);
    } catch (error) {
        console.error(error);
        container.innerHTML = `<p style="color:red">Gagal memuat data! (Cek apakah file JSON sudah di-push ke GitHub?)</p>`;
    }
}

function renderTerms(data) {
    stats.innerText = `Ditemukan ${data.length} istilah`;
    
    if (data.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px;"><p>😓 Istilah tidak ditemukan.</p></div>`;
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="card">
            <span class="category">${item.category}</span>
            <h3 class="term">${item.term}</h3>
            <p class="definition">${item.definition}</p>
        </div>
    `).join('');
}

// Fungsi Filter Kategori
function filterByCategory(cat) {
    // Update tombol aktif
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText === cat || (cat === 'All' && btn.innerText === 'Semua'));
    });

    if (cat === 'All') {
        renderTerms(termsData);
    } else {
        const filtered = termsData.filter(item => item.category === cat);
        renderTerms(filtered);
    }
}

// Pencarian Real-time
searchBox.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = termsData.filter(item => 
        item.term.toLowerCase().includes(keyword) || 
        item.category.toLowerCase().includes(keyword)
    );
    renderTerms(filtered);
});

loadTerms();