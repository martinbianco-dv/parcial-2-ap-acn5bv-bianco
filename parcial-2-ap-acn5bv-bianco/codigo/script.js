const statuses = [
  "Cargado",
  "Contactado",
  "Entrevistado",
  "Enviado al cliente",
  "Descartado"
];

const candidates = [
  {
    name: "Lucía Fernández",
    email: "lucia.fernandez@email.com",
    technology: "JavaScript",
    seniority: "Junior",
    availability: "Disponible",
    status: "Cargado"
  },
  {
    name: "Martín Gómez",
    email: "martin.gomez@email.com",
    technology: "Java",
    seniority: "Semi Senior",
    availability: "No disponible",
    status: "Cargado"
  },
  {
    name: "Sofía Ramírez",
    email: "sofia.ramirez@email.com",
    technology: "Python",
    seniority: "Senior",
    availability: "Disponible",
    status: "Cargado"
  }
];

const form = document.getElementById("candidateForm");
const tableBody = document.getElementById("candidateTable");
const searchInput = document.getElementById("search");

function renderCandidates() {
  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredCandidates = candidates.filter((candidate) => {
    const nameMatches = candidate.name.toLowerCase().includes(searchValue);
    const technologyMatches = candidate.technology.toLowerCase().includes(searchValue);
    return nameMatches || technologyMatches;
  });

  tableBody.innerHTML = "";

  if (filteredCandidates.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="7" class="empty-row">No se encontraron candidatos</td>';
    tableBody.appendChild(row);
    return;
  }

  filteredCandidates.forEach((candidate) => {
    const originalIndex = candidates.indexOf(candidate);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${candidate.name}</td>
      <td>${candidate.email}</td>
      <td>${candidate.technology}</td>
      <td>${candidate.seniority}</td>
      <td>${candidate.availability}</td>
      <td><span class="status-badge">${candidate.status}</span></td>
      <td><button class="status-button" data-index="${originalIndex}">Cambiar estado</button></td>
    `;

    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const candidate = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    technology: document.getElementById("technology").value.trim(),
    seniority: document.getElementById("seniority").value,
    availability: document.getElementById("availability").value,
    status: "Cargado"
  };

  candidates.push(candidate);
  form.reset();
  renderCandidates();
});

tableBody.addEventListener("click", (event) => {
  if (!event.target.classList.contains("status-button")) {
    return;
  }

  const index = Number(event.target.dataset.index);
  const currentStatus = candidates[index].status;
  const currentStatusIndex = statuses.indexOf(currentStatus);
  const nextStatusIndex = (currentStatusIndex + 1) % statuses.length;

  candidates[index].status = statuses[nextStatusIndex];
  renderCandidates();
});

searchInput.addEventListener("input", renderCandidates);

renderCandidates();
