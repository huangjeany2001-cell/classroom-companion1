/* ================= 座位表模組（seating.js） =================
   搭配 index.html 使用：座位資料存在 c.seating，隨班級一起同步到雲端。 */

(function(){
  const st = document.createElement("style");
  st.textContent = `
  .seat-stage{background:var(--ink);color:#EDE9DC;text-align:center;padding:6px;border-radius:var(--radius);margin:0 auto 14px;max-width:360px;font-size:13px;letter-spacing:4px;}
  .seat-grid{display:grid;gap:8px;}
  .seat{min-height:78px;border:1px solid var(--line);background:var(--paper);border-radius:var(--radius);padding:6px 4px;text-align:center;cursor:pointer;position:relative;user-select:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;}
  .seat.empty-seat{border-style:dashed;background:#fff;color:var(--ink-soft);font-size:12px;}
  .seat.blocked{background:repeating-linear-gradient(45deg,#EEE9DC,#EEE9DC 6px,#E4DDCB 6px,#E4DDCB 12px);border-style:dotted;}
  .seat.pres{border-color:var(--good);background:var(--good-bg);}
  .seat.late{border-color:var(--brass);background:var(--amber-bg);}
  .seat.abs{border-color:var(--seal);background:var(--warn-bg);}
  .seat.sel{outline:3px solid var(--seal);outline-offset:1px;}
  .seat-no{font-size:11px;color:var(--ink-soft);}
  .seat-name{font-weight:700;font-size:14.5px;color:var(--ink);}
  .seat-score{font-size:12px;color:var(--ink-soft);}
  .seat-x{position:absolute;top:2px;right:6px;font-size:11px;color:var(--ink-soft);}
  .seat-x:hover{color:var(--seal);}
  .seat-edit{position:absolute;top:2px;left:6px;font-size:12px;color:var(--ink-soft);}
  .seat-edit:hover{color:var(--ink);}
  .seat-chip{cursor:pointer;}
  .seat-chip.sel{background:var(--seal);color:#fff;border-color:var(--seal);}
  `;
  document.head.appendChild(st);
})();

let seatMode = "move";   // move | score | aisle
let seatSel = null;      // {type:"student",id} 或 {type:"seat",key}

function getSeating(c){
  if(!c.seating) c.seating = { rows:6, cols:5, seats:{}, blocked:{} };
  return c.seating;
}
function seatOf(sg, sid){
  return Object.keys(sg.seats).find(k => sg.seats[k] === sid);
}
function shuffleArr(a){
  a = [...a];
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
function freeSeatKeys(sg){
  const keys = [];
  for(let r=0;r<sg.rows;r++) for(let k=0;k<sg.cols;k++){
    const key = r+"-"+k;
    if(!sg.blocked[key]) keys.push(key);
  }
  return keys;
}

/* ---------- 操作 ---------- */
function setSeatMode(m){ seatMode = m; seatSel = null; renderView(); }

function resizeSeating(){
  const c = currentClass(); if(!c) return;
  const sg = getSeating(c);
  const rows = Math.min(15, Math.max(1, Number(document.getElementById("seatRows").value) || sg.rows));
  const cols = Math.min(15, Math.max(1, Number(document.getElementById("seatCols").value) || sg.cols));
  const keep = obj => {
    const out = {};
    Object.keys(obj).forEach(key=>{
      const [r,k] = key.split("-").map(Number);
      if(r<rows && k<cols) out[key] = obj[key];
    });
    return out;
  };
  sg.seats = keep(sg.seats);
  sg.blocked = keep(sg.blocked);
  sg.rows = rows; sg.cols = cols;
  seatSel = null; save(); renderView();
}

function seatPickStudent(sid){
  seatMode = "move";
  seatSel = (seatSel && seatSel.type==="student" && seatSel.id===sid) ? null : {type:"student", id:sid};
  renderView();
}

function seatClick(key){
  const c = currentClass(); if(!c) return;
  const sg = getSeating(c);

  if(seatMode === "aisle"){
    if(sg.blocked[key]) delete sg.blocked[key];
    else { sg.blocked[key] = true; delete sg.seats[key]; }
    save(); renderView(); return;
  }
  if(sg.blocked[key]) return;

  if(seatMode === "score"){
    const sid = sg.seats[key];
    if(sid) bumpScore(sid, 1);
    return;
  }

  // 排座位模式
  if(!seatSel){
    if(sg.seats[key]){ seatSel = {type:"seat", key}; renderView(); }
    else seatFillName(key);
    return;
  }
  if(seatSel.type === "student"){
    sg.seats[key] = seatSel.id;      // 原本坐這裡的人會回到「未入座」
    seatSel = null; save(); renderView(); return;
  }
  if(seatSel.key === key){ seatSel = null; renderView(); return; }
  const a = sg.seats[seatSel.key], b = sg.seats[key];
  if(b) sg.seats[seatSel.key] = b; else delete sg.seats[seatSel.key];
  sg.seats[key] = a;
  seatSel = null; save(); renderView();
}

function seatRemove(key, ev){
  ev.stopPropagation();
  const c = currentClass(); if(!c) return;
  delete getSeating(c).seats[key];
  seatSel = null; save(); renderView();
}

function seatDragStart(ev, type, val){
  if(seatMode !== "move"){ ev.preventDefault(); return; }
  seatSel = type==="seat" ? {type:"seat", key:val} : {type:"student", id:val};
  ev.dataTransfer.setData("text/plain","seat");
  ev.dataTransfer.effectAllowed = "move";
}
function seatDrop(ev, key){
  ev.preventDefault();
  if(seatMode==="move" && seatSel) seatClick(key);
}

function seatRandom(){
  const c = currentClass(); if(!c || !c.students.length) return;
  if(!confirm("要把全班學生隨機重新排座位嗎？目前的座位會被覆蓋。")) return;
  const sg = getSeating(c);
  const free = shuffleArr(freeSeatKeys(sg));
  const studs = shuffleArr(c.students);
  sg.seats = {};
  studs.forEach((s,i)=>{ if(i<free.length) sg.seats[free[i]] = s.id; });
  if(studs.length > free.length) alert(`座位只有 ${free.length} 個，還有 ${studs.length-free.length} 位學生沒有座位，請增加行列數。`);
  seatSel = null; save(); renderView();
}
function seatByNumber(){
  const c = currentClass(); if(!c || !c.students.length) return;
  if(!confirm("要依座號由前到後、由左到右排座位嗎？目前的座位會被覆蓋。")) return;
  const sg = getSeating(c);
  const free = freeSeatKeys(sg);
  const studs = [...c.students].sort((a,b)=>a.seatNo-b.seatNo);
  sg.seats = {};
  studs.forEach((s,i)=>{ if(i<free.length) sg.seats[free[i]] = s.id; });
  if(studs.length > free.length) alert(`座位只有 ${free.length} 個，還有 ${studs.length-free.length} 位學生沒有座位，請增加行列數。`);
  seatSel = null; save(); renderView();
}
function seatClearAll(){
  const c = currentClass(); if(!c) return;
  if(!confirm("確定要清空所有座位嗎？（走道設定會保留）")) return;
  getSeating(c).seats = {};
  seatSel = null; save(); renderView();
}

/* ---------- 畫面 ---------- */
function renderSeating(panel, c){
  const sg = getSeating(c);
  const placed = new Set(Object.values(sg.seats));
  const unseated = [...c.students].sort((a,b)=>a.seatNo-b.seatNo).filter(s=>!placed.has(s.id));
  const dayAtt = c.attendance[attDate] || {};
  const byId = {};
  c.students.forEach(s => byId[s.id] = s);

  let cells = "";
  for(let r=0;r<sg.rows;r++){
    for(let k=0;k<sg.cols;k++){
      const key = r+"-"+k;
      if(sg.blocked[key]){
        cells += `<div class="seat blocked" onclick="seatClick('${key}')"></div>`;
        continue;
      }
      const s = byId[sg.seats[key]];
      const isSel = seatSel && seatSel.type==="seat" && seatSel.key===key;
      const drop = `ondragover="event.preventDefault()" ondrop="seatDrop(event,'${key}')"`;
      if(!s){
        cells += `<div class="seat empty-seat" onclick="seatClick('${key}')" ${drop}>${seatMode==="move"?"＋ 填姓名":"空位"}</div>`;
        continue;
      }
      const att = dayAtt[s.id];
      const attCls = att==="present" ? "pres" : att==="late" ? "late" : att==="absent" ? "abs" : "";
      cells += `
        <div class="seat ${attCls} ${isSel?"sel":""}" onclick="seatClick('${key}')" ${drop}
             ${seatMode==="move" ? `draggable="true" ondragstart="seatDragStart(event,'seat','${key}')"` : ""}>
          ${seatMode==="move" ? `<span class="seat-x" onclick="seatRemove('${key}',event)">✕</span><span class="seat-edit" onclick="seatRename('${s.id}',event)">✎</span>` : ""}
          <div class="seat-no">${s.seatNo}號</div>
          <div class="seat-name">${escapeHtml(s.name)}</div>
          <div class="seat-score">${s.score||0} 分</div>
          ${seatMode==="score" ? `<button class="small minus" onclick="event.stopPropagation();bumpScore('${s.id}',-1)">－1</button>` : ""}
        </div>`;
    }
  }

  const hints = {
    move: "直接點空位可輸入學生姓名（✎ 可改名）；也可以點選下方「未入座」的學生，再點空位入座；點兩個座位可互換；電腦上也可以直接拖曳。座位右上角的 ✕ 可讓學生離座。",
    score: "點座位加 1 分，按「－1」扣 1 分（成績鎖定時無法修改）。",
    aisle: "點任何格子，可切換成「走道／空位」（斜線格），再點一次就恢復成座位。"
  };
  const modeBtn = (m, label) =>
    `<button class="btn ${seatMode===m?"":"ghost"}" onclick="setSeatMode('${m}')">${label}</button>`;

  panel.innerHTML = `
    <div class="toolbar">
      ${modeBtn("move","排座位")}
      ${modeBtn("score","加減分")}
      ${modeBtn("aisle","設定走道")}
    </div>
    <div class="field-row">
      <label>排數（由前到後）</label>
      <input type="number" id="seatRows" min="1" max="15" value="${sg.rows}" style="width:64px;">
      <label>每排幾位</label>
      <input type="number" id="seatCols" min="1" max="15" value="${sg.cols}" style="width:64px;">
      <button class="btn ghost" onclick="resizeSeating()">套用大小</button>
      <button class="btn ghost" onclick="seatByNumber()">依座號排列</button>
      <button class="btn ghost" onclick="seatRandom()">隨機排座位</button>
      <button class="btn ghost" onclick="seatClearAll()">清空座位</button>
    </div>
    <div class="hint" style="margin:0 0 12px;">${hints[seatMode]}　格子顏色對應「課堂點名」分頁目前選擇的日期（${attDate}）：綠＝出席、黃＝遲到、紅＝缺席。</div>
    <div class="seat-stage">講　台</div>
    <div class="seat-grid" style="grid-template-columns:repeat(${sg.cols}, minmax(78px, 1fr));">${cells}</div>
    <div class="section-label">未入座的學生（${unseated.length} 位）</div>
    <div class="chip-row">
      ${unseated.length ? unseated.map(s=>`
        <span class="chip seat-chip ${seatSel&&seatSel.type==="student"&&seatSel.id===s.id?"sel":""}"
              draggable="true" ondragstart="seatDragStart(event,'student','${s.id}')"
              onclick="seatPickStudent('${s.id}')">${s.seatNo}號 ${escapeHtml(s.name)}</span>`).join("")
        : `<span style="font-size:13px;color:var(--ink-soft);">所有學生都已入座 ✓</span>`}
    </div>
  `;
}


/* ---------- 直接在座位上填姓名 / 改名 ---------- */
function seatFillName(key){
  const c = currentClass(); if(!c) return;
  const sg = getSeating(c);
  const name = prompt("請輸入這個座位的學生姓名");
  if(!name || !name.trim()) return;
  const nm = name.trim();
  const placed = new Set(Object.values(sg.seats));
  let s = c.students.find(x => x.name === nm);
  if(s && placed.has(s.id)){ alert(`「${nm}」已經在座位上了，要換位置請點他的座位再點新位置。`); return; }
  if(!s){
    s = { id:uid(), seatNo: nextSeatNo(c), name:nm, score:0, marks:{} };
    c.students.push(s);
    c.students.sort((a,b)=>a.seatNo-b.seatNo);
  }
  sg.seats[key] = s.id;
  save(); renderView();
}
function seatRename(sid, ev){
  ev.stopPropagation();
  const c = currentClass(); if(!c) return;
  const s = c.students.find(x => x.id === sid); if(!s) return;
  const nm = prompt("修改學生姓名", s.name);
  if(!nm || !nm.trim()) return;
  setName(sid, nm.trim());
  renderView();
}

/* ---------- 自動掛上「座位表」分頁（不需要再改 index.html 其他地方） ---------- */
(function(){
  if(typeof TAB_DEFS !== "undefined" && !TAB_DEFS.some(t => t.key === "seating")){
    const i = TAB_DEFS.findIndex(t => t.key === "io");
    TAB_DEFS.splice(i < 0 ? TAB_DEFS.length : i, 0, {key:"seating", label:"座位表"});
  }
  if(typeof renderView === "function" && !renderView.__seating){
    const orig = renderView;
    renderView = function(){
      const c = currentClass();
      if(currentView === "seating" && c){ renderSeating(document.getElementById("panel"), c); return; }
      orig();
    };
    renderView.__seating = true;
  }
  if(typeof renderTabs === "function") renderTabs();
})();
