// ============================================================
// INTERIOR DESIGNER FLOW
// ============================================================

SCREENS['d-splash'] = {
  flow:'designer', tabbar:false, crumbs:['Designer','Splash'],
  note:'Designer-side entry point. Tap to continue to login.',
  render(){
    return `
    <div class="col grow" style="background:linear-gradient(160deg,#2C2A26,#1c1a17 75%); align-items:center; justify-content:center; height:100%; cursor:pointer; color:#fff;" onclick="goTo('d-login')">
      <div class="col center-text" style="align-items:center; gap:18px;">
        <div style="width:108px;height:108px;border-radius:28px;background:rgba(255,255,255,0.08); display:flex;align-items:center;justify-content:center; border:1px solid rgba(255,255,255,0.2);">
          <span style="font-family:'Fraunces',serif; font-size:40px; font-weight:700; color:var(--gold-soft);">AR</span>
        </div>
        <div>
          <div style="font-family:'Fraunces',serif; font-size:26px; font-weight:600;">AR Home <span style="color:var(--gold-soft); font-weight:400;">Pro</span></div>
          <div style="font-size:12.5px; letter-spacing:0.18em; text-transform:uppercase; color:#a89a82; margin-top:2px;">For Interior Designers</div>
        </div>
        <div class="hint-pill" style="margin-top:30px;">Tap to begin →</div>
      </div>
    </div>`;
  }
};

SCREENS['d-login'] = {
  flow:'designer', tabbar:false, crumbs:['Designer','Login'],
  note:'Designer login routes into the Designer Pro Hub dashboard.',
  render(){
    return `
    ${statusRow()}
    ${header('')}
    <div class="content" style="padding-top:18px;">
      <div class="col" style="align-items:center; margin-bottom:26px;">
        <div style="width:64px;height:64px;border-radius:18px;background:var(--ink); display:flex;align-items:center;justify-content:center; margin-bottom:12px;">
          <span style="font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:var(--gold-soft);">AR</span>
        </div>
        <h2 style="font-size:21px;">Interior Designer Login</h2>
        <div class="muted small" style="margin-top:4px;">Manage your clients & projects, all in one place</div>
      </div>
      <div class="field"><label>Email address</label><input type="email" value="julia.briones@studio.com"></div>
      <div class="field"><label>Password</label><input type="password" value="••••••••"></div>
      <button class="btn btn-dark btn-block" onclick="goTo('d-dashboard')">Login</button>
      <div class="center-text small" style="margin-top:22px; color:var(--ink-soft);">New to AR Home Pro? <span style="color:var(--tan-deep); font-weight:800; cursor:pointer;" onclick="goTo('d-subscription')">Apply as a designer</span></div>
    </div>`;
  }
};

SCREENS['d-dashboard'] = {
  flow:'designer', tabbar:true, tabKey:'dashboard', crumbs:['Designer','Pro Hub Dashboard'],
  note:'Designer Pro Hub overview — projects, schedule, and quick stats. Tap a project card to view its client.',
  render(){
    return `
    ${statusRow()}
    <div class="content" style="padding-top:8px;">
      <div class="row between" style="padding:6px 0 16px;">
        <div class="row gap10">
          <div class="avatar" style="background-image:url('${IMG.avatar_julia}')" onclick="goTo('d-account')"></div>
          <div>
            <div class="muted small" style="font-size:11px;">Welcome to</div>
            <div style="font-weight:800; font-size:15px;">DESIGNER PRO HUB</div>
          </div>
        </div>
        <div class="icon-btn">${ICON.bell}</div>
      </div>

      <div class="row gap10" style="margin-bottom:18px;">
        <div class="card grow" style="padding:14px;">
          <div class="muted small">Active Projects</div>
          <div style="font-size:22px; font-weight:800; margin-top:2px;">7</div>
        </div>
        <div class="card grow" style="padding:14px;">
          <div class="muted small">This Week</div>
          <div style="font-size:22px; font-weight:800; margin-top:2px;">12</div>
        </div>
        <div class="card grow" style="padding:14px;">
          <div class="muted small">Unread</div>
          <div style="font-size:22px; font-weight:800; margin-top:2px; color:var(--blush);">4</div>
        </div>
      </div>

      <div class="row between" style="align-items:baseline;">
        <div class="section-label" style="margin:0;">Recent Activity</div>
        <div class="small" style="color:var(--tan-deep); font-weight:700; cursor:pointer;" onclick="goTo('d-clients')">View clients</div>
      </div>
      ${activityRow('avatar_sarah','Sarah J. updated', 'Contemporary Living Room moodboard')}
      ${activityRow('avatar_markp','Mark P. confirmed', 'site visit for Office Makeover')}
      ${activityRow('avatar_lisa','Lisa W. updated', 'Long Beach Design budget')}

      <div class="row between" style="align-items:baseline; margin-top:16px;">
        <div class="section-label" style="margin:0;">Your Projects</div>
      </div>
      ${projectCard('Contemporary Living Room','Sarah J. · 2 In Progress', IMG.room_modern)}
      ${projectCard('Modern Apartment','Julian B. · Updating', IMG.room_cozy)}
      ${projectCard('Office Makeover','Mark P. · 25/30 days', IMG.room_office)}
    </div>
    ${tabbar('dashboard','designer')}
    `;
  }
};
function activityRow(personKey,bold,rest){
  return `<div class="list-row" onclick="goTo('d-client-detail')">
    <div class="avatar sm" style="background-image:url('${IMG[personKey]}')"></div>
    <div class="txt"><div class="t1" style="font-weight:700; font-size:13px;">${bold} <span style="font-weight:500; color:var(--ink-soft);">${rest}</span></div></div>
  </div>`;
}
function projectCard(title,sub,img){
  return `<div class="card row gap12" style="padding:10px; margin-bottom:12px; cursor:pointer;" onclick="goTo('d-client-detail')">
    <img src="${img}" style="width:58px;height:58px;border-radius:12px;object-fit:cover;">
    <div class="grow"><div class="small" style="font-weight:800;">${title}</div><div class="muted small">${sub}</div></div>
    <div class="chev">${ICON.chevR}</div>
  </div>`;
}

SCREENS['d-clients'] = {
  flow:'designer', tabbar:true, tabKey:'clients', crumbs:['Designer','Clients'],
  note:'Full client roster with project status badges. Tap any client to open their project detail.',
  render(){
    return `
    ${statusRow()}
    ${header('Clients', {noBack:true, right:`<div class="icon-btn">${ICON.plus}</div>`})}
    <div class="content" style="padding-top:6px;">
      <div class="pill-row">
        ${['All Clients','In Progress','Completed','On Hold'].map((p,i)=>`<div class="filter-pill ${i===0?'active':''}">${p}</div>`).join('')}
      </div>
      ${clientRow('Sarah J.','Contemporary Living Room','In Progress','badge-gold', IMG.avatar_sarah)}
      ${clientRow('Mark P.','Office Apartment','In Progress','badge-gold', IMG.avatar_markp)}
      ${clientRow('Julian B.','Modern Apartment','Reviewing','badge-blush', IMG.avatar_julian)}
      ${clientRow('Lisa W.','Long Beach Design','Completed','badge-green', IMG.avatar_lisa)}
      ${clientRow('Aldo R.','Studio Refresh','Completed','badge-green', IMG.avatar_aldo)}
    </div>
    ${tabbar('clients','designer')}
    `;
  }
};
function clientRow(name,project,status,badgeClass,img){
  return `<div class="card row gap12" style="padding:12px; margin-bottom:10px; cursor:pointer;" onclick="goTo('d-client-detail')">
    <div class="avatar" style="background-image:url('${img}')"></div>
    <div class="grow"><div class="small" style="font-weight:800;">${name}</div><div class="muted small">${project}</div></div>
    <div class="badge ${badgeClass}">${status}</div>
  </div>`;
}

SCREENS['d-client-detail'] = {
  flow:'designer', tabbar:false, crumbs:['Clients','Project Detail'],
  note:'Project & client management detail — budget, timeline, and moodboard. Tap "Open Collaboration Hub" to co-design live.',
  render(){
    return `
    ${statusRow()}
    ${header('Sarah J.', {right:`<div class="icon-btn">${ICON.dots}</div>`})}
    <div class="content" style="padding-top:6px;">
      <div class="card" style="padding:14px; margin-bottom:16px;">
        <div class="row gap12">
          <div class="avatar lg" style="background-image:url('${IMG.avatar_sarah}')"></div>
          <div class="grow">
            <div style="font-weight:800; font-size:15px;">Sarah J.</div>
            <div class="muted small">Contemporary Living Room</div>
            <div class="badge badge-gold" style="margin-top:6px;">In Progress</div>
          </div>
        </div>
      </div>

      <div class="row gap10" style="margin-bottom:16px;">
        <div class="card grow" style="padding:12px;"><div class="muted small">Budget</div><div style="font-weight:800; margin-top:2px;">₱185,000</div></div>
        <div class="card grow" style="padding:12px;"><div class="muted small">Timeline</div><div style="font-weight:800; margin-top:2px;">25 / 30 days</div></div>
      </div>

      <div class="section-label" style="margin-top:0;">Moodboard</div>
      <div class="row gap10" style="overflow-x:auto; margin-bottom:16px;">
        <img src="${IMG.portfolio1}" style="width:90px;height:90px;border-radius:12px;object-fit:cover; flex-shrink:0; cursor:pointer;" onclick="goTo('d-collab')">
        <img src="${IMG.portfolio2}" style="width:90px;height:90px;border-radius:12px;object-fit:cover; flex-shrink:0; cursor:pointer;" onclick="goTo('d-collab')">
        <img src="${IMG.room_modern}" style="width:90px;height:90px;border-radius:12px;object-fit:cover; flex-shrink:0; cursor:pointer;" onclick="goTo('d-collab')">
      </div>

      <div class="section-label">Recent Activity</div>
      <div class="card" style="padding:4px 14px;">
        ${listRow(ICON.edit,'Sarah J. updated','moodboard 2 hours ago')}
        ${listRow(ICON.chat,'New comment','on the AR mock-up session')}
        ${listRow(ICON.calendar,'Site visit confirmed','Friday, 2:00 PM')}
      </div>
    </div>
    <div class="bottom-cta">
      <button class="btn btn-dark btn-block" onclick="goTo('d-collab')">${ICON.layers} Open Collaboration Hub</button>
    </div>
    `;
  }
};

SCREENS['d-collab'] = {
  flow:'designer', tabbar:false, crumbs:['Project','Collaboration Hub'],
  note:'Live co-design session — designer and client view the same AR mock-up together with comment threads.',
  render(){
    return `
    ${statusRow()}
    ${header('Collaboration Hub', {right:`<div class="icon-btn">${ICON.share}</div>`})}
    <div class="content" style="padding-top:6px;">
      <div style="border-radius:18px; overflow:hidden; position:relative; height:170px; margin-bottom:14px;">
        <img src="${IMG.room_modern}" style="width:100%;height:100%;object-fit:cover;">
        <div class="badge badge-green" style="position:absolute; top:10px; left:10px;">● Live session</div>
        <div class="row" style="position:absolute; bottom:10px; right:10px; gap:-8px;">
          <div class="avatar sm" style="background-image:url('${IMG.avatar_sarah}'); border:2px solid #fff; margin-left:-8px;"></div>
          <div class="avatar sm" style="background-image:url('${IMG.avatar_julia}'); border:2px solid #fff; margin-left:-8px;"></div>
        </div>
      </div>
      <div class="card" style="padding:14px; margin-bottom:14px;">
        <div class="row gap10" style="margin-bottom:8px;">
          <div class="ic">${ICON.scan}</div>
          <div class="grow"><div class="small" style="font-weight:800;">Sun Up AR Mark-up Annotations</div><div class="muted small">Place, resize, and notes sync live with Sarah</div></div>
        </div>
        <button class="btn btn-outline btn-block" onclick="goTo('ar-scan-launch')">Open AR Scan Mode</button>
      </div>
      <div class="section-label" style="margin-top:0;">Client Comment Thread</div>
      ${commentRow('avatar_sarah','Sarah J.','Love the direction of this — can we try a lighter wood tone?')}
      ${commentRow('avatar_julia','You','Sure! Swapping the oak finish now, give me a sec.')}
    </div>
    <div class="bottom-cta">
      <div class="search-bar" style="margin:0;"><input placeholder="Send a message to Sarah..."></div>
    </div>
    `;
  }
};
function commentRow(personKey,name,text){
  return `<div class="row gap10" style="margin-bottom:14px; align-items:flex-start;">
    <div class="avatar sm" style="background-image:url('${IMG[personKey]}')"></div>
    <div class="grow"><div class="small" style="font-weight:800;">${name}</div><div class="muted small" style="line-height:1.5;">${text}</div></div>
  </div>`;
}

SCREENS['d-portfolio'] = {
  flow:'designer', tabbar:true, tabKey:'portfolio', crumbs:['Designer','My Portfolio'],
  note:'Public-facing portfolio grid that clients browse. Tap a project to preview, or "Reviews" to see ratings.',
  render(){
    return `
    ${statusRow()}
    ${header('My Portfolio', {noBack:true, right:`<div class="icon-btn" onclick="goTo('d-reviews')">${ICON.star}</div>`})}
    <div class="content" style="padding-top:6px;">
      <div class="row gap12" style="margin-bottom:16px;">
        <div class="avatar lg" style="background-image:url('${IMG.avatar_julia}')"></div>
        <div class="grow">
          <div style="font-weight:800; font-size:16px;">Julia Briones</div>
          <div class="muted small">Interior Designer · Manila, PH</div>
          <div class="stars row gap6" style="margin-top:4px;">${ICON.star} 4.9 · 38 reviews</div>
        </div>
      </div>
      <div class="pill-row">
        ${['All','Living Room','Bedroom','Office'].map((p,i)=>`<div class="filter-pill ${i===0?'active':''}">${p}</div>`).join('')}
      </div>
      <div class="product-grid">
        ${portfolioCard('Modern Penthouse', IMG.portfolio1)}
        ${portfolioCard('Cozy Reading Nook', IMG.portfolio2)}
        ${portfolioCard('Office Refresh', IMG.portfolio3)}
        ${portfolioCard('Long Beach Design', IMG.room_modern)}
      </div>
    </div>
    ${tabbar('portfolio','designer')}
    `;
  }
};
function portfolioCard(title,img){
  return `<div class="product-card" onclick="goTo('d-reviews')">
    <div class="img" style="background-image:url('${img}'); height:130px;"></div>
    <div class="pinfo"><div class="pname">${title}</div></div>
  </div>`;
}

SCREENS['d-reviews'] = {
  flow:'designer', tabbar:false, crumbs:['Portfolio','Reviews'],
  note:'Aggregated rating and recent client reviews.',
  render(){
    return `
    ${statusRow()}
    ${header('My Portfolio & Reviews')}
    <div class="content" style="padding-top:10px;">
      <div class="col center-text" style="align-items:center; margin-bottom:22px;">
        <div style="font-family:'Fraunces',serif; font-size:40px; font-weight:700; color:var(--tan-deep);">4.9</div>
        <div class="stars" style="margin:6px 0;">${ICON.star}${ICON.star}${ICON.star}${ICON.star}${ICON.star}</div>
        <div class="muted small">Based on 38 reviews</div>
      </div>
      <div class="section-label" style="margin-top:0;">Recent Reviews</div>
      ${reviewRow('avatar_sarah','Sarah J.','Bringing design to life! AR mock-ups completely changed how confident I felt picking pieces.',5)}
      ${reviewRow('avatar_markp','Mark P.','Very professional and attentive to detail. Highly recommend!',5)}
      ${reviewRow('avatar_lisa','Lisa W.','Great creativity and quick turnaround on revisions.',4)}
    </div>
    `;
  }
};
function reviewRow(personKey,name,text,stars){
  return `<div class="card" style="padding:14px; margin-bottom:12px;">
    <div class="row gap10" style="margin-bottom:8px;">
      <div class="avatar sm" style="background-image:url('${IMG[personKey]}')"></div>
      <div class="grow"><div class="small" style="font-weight:800;">${name}</div></div>
      <div class="stars">${'★'.repeat(stars)}<span style="color:var(--line);">${'★'.repeat(5-stars)}</span></div>
    </div>
    <div class="muted small" style="line-height:1.55;">${text}</div>
  </div>`;
}

SCREENS['d-account'] = {
  flow:'designer', tabbar:true, tabKey:'account', crumbs:['Designer','Account'],
  note:'Designer account menu, including subscription plan management.',
  render(){
    return `
    ${statusRow()}
    ${header('Account', {noBack:true})}
    <div class="content" style="padding-top:6px;">
      <div class="row gap14" style="padding:8px 4px 22px;">
        <div class="avatar lg" style="background-image:url('${IMG.avatar_julia}')"></div>
        <div>
          <div style="font-weight:800; font-size:16px;">Julia Briones</div>
          <div class="muted small">julia.briones@studio.com</div>
          <div class="badge badge-gold" style="margin-top:6px;">ARHome Plus</div>
        </div>
      </div>
      <div class="card" style="padding:4px 16px;">
        ${listRow(ICON.edit,'Edit Profile','Bio, specialties, portfolio photo')}
        ${listRow(ICON.briefcase,'Subscription','ARHome Plus · renews Jul 18', ()=>goTo('d-subscription'))}
        ${listRow(ICON.card,'Payouts','Manage your earnings')}
        ${listRow(ICON.settings,'Settings','Notifications, privacy')}
      </div>
      <div class="card" style="padding:4px 16px; margin-top:14px;" onclick="goTo('d-splash')">
        ${listRow(ICON.logout,'Logout','Sign out of this device')}
      </div>
    </div>
    ${tabbar('account','designer')}
    `;
  }
};

SCREENS['d-subscription'] = {
  flow:'designer', tabbar:false, crumbs:['Account','Subscription'],
  note:'Plan tiers match the Sales & Customer Service pricing strategy: a primary subscription ladder plus a secondary pay-per-use token option.',
  render(){
    return `
    ${statusRow()}
    ${header('Subscription', {right:''})}
    <div class="content" style="padding-top:6px;">
      <div class="section-label" style="margin-top:0;">Primary — Subscription</div>
      ${planCard('Basic','Free','Color swap only',false)}
      ${planCard('ARHome Plus','₱199/mo','Full features, partner access',true)}
      ${planCard('ARHome Pro','₱349/mo','Priority AI, enterprise tools',false)}

      <div class="section-label">Secondary — Pay Per Use</div>
      <div class="role-card" style="align-items:flex-start; cursor:default;">
        <div class="ric">${ICON.camera}</div>
        <div class="grow">
          <div class="row between"><div style="font-weight:800; font-size:14.5px;">Token System</div><div style="font-weight:800; color:var(--tan-deep);">₱10 / image</div></div>
          <div class="muted small" style="margin-top:4px;">Pay only for what you generate. Basic features only — no subscription required.</div>
        </div>
      </div>
    </div>
    <div class="bottom-cta">
      <button class="btn btn-dark btn-block" onclick="goTo('d-dashboard')">Confirm Plan</button>
    </div>
    `;
  }
};
function planCard(name,price,desc,selected){
  return `<div class="role-card ${selected?'selected':''}" style="align-items:flex-start;">
    <div class="ric">${ICON.briefcase}</div>
    <div class="grow">
      <div class="row between"><div style="font-weight:800; font-size:14.5px;">${name}</div><div style="font-weight:800; color:var(--tan-deep);">${price}</div></div>
      <div class="muted small" style="margin-top:4px;">${desc}</div>
    </div>
  </div>`;
}
