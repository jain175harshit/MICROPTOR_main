// careers.js
// Moves inline job data and rendering logic out of careers.html

// Jobs data (edit here to add/update roles)
const JOBS = [
  { id: 'emb-1', title: 'Embedded Systems Engineer', team: 'Embedded', location: 'Surat', type: ['Full-time','Part-time'], product: 'pdp1.html', apply: 'apply.html?position=Embedded%20Systems%20Engineer', blurb: 'Flight controllers, firmware, real-time systems for UAV platforms.', reqs: ['C/C++ on MCUs','RTOS & peripherals','IMU/GPS sensors'] },
  { id: 'cv-1', title: 'Computer Vision Engineer', team: 'Computer Vision', location: 'Surat', type: ['Full-time','Part-time'], product: 'pdp1.html', apply: 'apply.html?position=Computer%20Vision%20Engineer', blurb: 'Perception for detection, tracking and onboard inference.', reqs: ['PyTorch/TensorFlow','SLAM & fusion','Embedded deploy is a plus'] },
  { id: 'ops-1', title: 'Field Operations Specialist', team: 'Field Ops', location: 'Surat', type: ['Full-time','Part-time'], product: 'pdp2.html', apply: 'apply.html?position=Field%20Operations%20Specialist', blurb: 'Deployments, maintenance, and field trials coordination.', reqs: ['UAV operation','Mechanical troubleshooting','Strong communication'] },
];

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('jobsList');
  const noRes = document.getElementById('noResults');
  const team = document.getElementById('filterTeam');
  const loc = document.getElementById('filterLocation');
  const type = document.getElementById('filterType');
  const search = document.getElementById('filterSearch');

  function passes(job){
    const t = team.value; const l = loc.value; const ty = type.value; const q = search.value.trim().toLowerCase();
    if (t && job.team !== t) return false;
    if (l && job.location !== l) return false;
    if (ty){
      const jtypes = Array.isArray(job.type) ? job.type : [job.type];
      if (!jtypes.includes(ty)) return false;
    }
    if (q){
      const hay = (job.title + ' ' + job.team + ' ' + job.location + ' ' + (job.reqs||[]).join(' ') + ' ' + (Array.isArray(job.type)? job.type.join(' ') : job.type)).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function render(){
    const matches = JOBS.filter(passes);
    listEl.innerHTML = matches.map(j => `
      <article class="p-6 bg-[var(--neutral-800)] rounded-lg border border-[var(--neutral-700)] flex flex-col">
        <div class="flex-1">
          <h3 class="text-lg font-semibold">${j.title}</h3>
          <p class="text-[var(--neutral-400)] mt-2">${j.blurb}</p>
          <div class="mt-3 text-[var(--neutral-300)] text-sm flex flex-wrap gap-3">
            <span class="px-2 py-1 rounded bg-black/30 border border-[var(--neutral-700)]">${j.team}</span>
            <span class="px-2 py-1 rounded bg-black/30 border border-[var(--neutral-700)]">${j.location}</span>
            ${Array.isArray(j.type) ? j.type.map(tt=>`<span class=\"px-2 py-1 rounded bg-black/30 border border-[var(--neutral-700)]\">${tt}</span>`).join('') : `<span class=\"px-2 py-1 rounded bg-black/30 border border-[var(--neutral-700)]\">${j.type}</span>`}
          </div>
          ${j.reqs && j.reqs.length ? `<ul class="mt-3 text-[var(--neutral-400)] list-disc list-inside">${j.reqs.map(r=>`<li>${r}</li>`).join('')}</ul>` : ''}
        </div>
        <div class="mt-4 flex gap-3">
          <a href="${j.apply}" class="inline-block px-4 py-2 bg-[var(--primary-color)] hover:bg-red-600 text-white rounded">Apply</a>
        </div>
      </article>
    `).join('');
    noRes.classList.toggle('hidden', matches.length !== 0);
  }

  [team, loc, type, search].forEach(el => el.addEventListener('input', render));
  render();
});
