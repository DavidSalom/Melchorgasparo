/* ═══════════════════════════════════════════════════════
   Melchor Gasparó — Sistema de Gestión de Excedencias
   Lógica de aplicación
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ──────────────────────────────────────────────────
    // DEFAULT DATA
    // ──────────────────────────────────────────────────

    const DEFAULT_USERS = [
        { id: 'u1', email: 'admin@melchorgasparo.com',      password: 'admin123',  name: 'Carlos Melchor',    role: 'admin',      obraId: null },
        { id: 'u2', email: 'jefe1@melchorgasparo.com',      password: 'jefe123',   name: 'Ana García',        role: 'jefe_obra',  obraId: 'o1' },
        { id: 'u3', email: 'jefe2@melchorgasparo.com',      password: 'jefe123',   name: 'Pedro Martínez',    role: 'jefe_obra',  obraId: 'o2' },
        { id: 'u4', email: 'jefe3@melchorgasparo.com',      password: 'jefe123',   name: 'Laura Sánchez',     role: 'jefe_obra',  obraId: 'o3' },
        { id: 'u5', email: 'jefe4@melchorgasparo.com',      password: 'jefe123',   name: 'Miguel Torres',     role: 'jefe_obra',  obraId: 'o4' },
        { id: 'u6', email: 'encargado1@melchorgasparo.com', password: 'enc123',    name: 'Jordi Vila',        role: 'encargado',  obraId: 'o1' },
        { id: 'u7', email: 'encargado2@melchorgasparo.com', password: 'enc123',    name: 'Marta López',       role: 'encargado',  obraId: 'o2' },
        { id: 'u8', email: 'encargado3@melchorgasparo.com', password: 'enc123',    name: 'David Ruiz',        role: 'encargado',  obraId: 'o3' },
    ];

    const DEFAULT_MATERIALS = [
        { id: 'm1',  name: 'Cemento Portland',              unit: 'sacos',    category: 'Áridos y conglomerantes' },
        { id: 'm2',  name: 'Arena fina',                    unit: 'm³',       category: 'Áridos y conglomerantes' },
        { id: 'm3',  name: 'Grava',                         unit: 'm³',       category: 'Áridos y conglomerantes' },
        { id: 'm4',  name: 'Yeso',                          unit: 'sacos',    category: 'Áridos y conglomerantes' },
        { id: 'm5',  name: 'Mortero',                       unit: 'sacos',    category: 'Áridos y conglomerantes' },
        { id: 'm6',  name: 'Ladrillos',                     unit: 'uds',      category: 'Elementos constructivos' },
        { id: 'm7',  name: 'Bloques de hormigón',           unit: 'uds',      category: 'Elementos constructivos' },
        { id: 'm8',  name: 'Tubería PVC 110mm',             unit: 'uds',      category: 'Fontanería' },
        { id: 'm9',  name: 'Tubería PVC 50mm',              unit: 'uds',      category: 'Fontanería' },
        { id: 'm10', name: 'Cable eléctrico 2.5mm',         unit: 'm',        category: 'Electricidad' },
        { id: 'm11', name: 'Cable eléctrico 4mm',           unit: 'm',        category: 'Electricidad' },
        { id: 'm12', name: 'Pintura blanca',                unit: 'cubos',    category: 'Acabados' },
        { id: 'm13', name: 'Pintura impermeabilizante',     unit: 'cubos',    category: 'Acabados' },
        { id: 'm14', name: 'Azulejos',                      unit: 'm²',       category: 'Acabados' },
        { id: 'm15', name: 'Acero corrugado 12mm',          unit: 'barras',   category: 'Estructura' },
        { id: 'm16', name: 'Acero corrugado 16mm',          unit: 'barras',   category: 'Estructura' },
        { id: 'm17', name: 'Madera de encofrado',           unit: 'tablones', category: 'Estructura' },
        { id: 'm18', name: 'Aislante térmico',              unit: 'rollos',   category: 'Aislamiento' },
        { id: 'm19', name: 'Membrana impermeabilizante',    unit: 'rollos',   category: 'Aislamiento' },
        { id: 'm20', name: 'Tornillería variada',           unit: 'cajas',    category: 'Ferretería' },
    ];

    const DEFAULT_OBRAS = [
        { id: 'o1', name: 'Residencial Norte',              address: 'Calle del Norte 45, Barcelona',          status: 'activa' },
        { id: 'o2', name: 'Centro Comercial Diagonal',      address: 'Av. Diagonal 320, Barcelona',            status: 'activa' },
        { id: 'o3', name: 'Nave Industrial Zona Franca',    address: 'Polígono Zona Franca, Barcelona',        status: 'activa' },
        { id: 'o4', name: 'Rehabilitación Eixample',        address: 'Calle Aragón 215, Barcelona',            status: 'activa' },
    ];

    const DEFAULT_EXCEDENCIAS = [
        { id: 'e1', obraId: 'o1', materialId: 'm1',  cantidad: 25,  estado: 'publicada', registradoPor: 'u6', fechaRegistro: '2026-10-20', publicadoPor: 'u2', fechaPublicacion: '2026-10-21' },
        { id: 'e2', obraId: 'o1', materialId: 'm6',  cantidad: 500, estado: 'publicada', registradoPor: 'u6', fechaRegistro: '2026-10-22', publicadoPor: 'u2', fechaPublicacion: '2026-10-22' },
        { id: 'e3', obraId: 'o1', materialId: 'm10', cantidad: 200, estado: 'publicada', registradoPor: 'u6', fechaRegistro: '2026-10-25', publicadoPor: 'u2', fechaPublicacion: '2026-10-26' },
        { id: 'e4', obraId: 'o2', materialId: 'm8',  cantidad: 30,  estado: 'publicada', registradoPor: 'u7', fechaRegistro: '2026-10-18', publicadoPor: 'u3', fechaPublicacion: '2026-10-19' },
        { id: 'e5', obraId: 'o2', materialId: 'm12', cantidad: 10,  estado: 'publicada', registradoPor: 'u7', fechaRegistro: '2026-10-27', publicadoPor: 'u3', fechaPublicacion: '2026-10-28' },
        { id: 'e6', obraId: 'o3', materialId: 'm15', cantidad: 50,  estado: 'publicada', registradoPor: 'u8', fechaRegistro: '2026-10-15', publicadoPor: 'u4', fechaPublicacion: '2026-10-16' },
        { id: 'e7', obraId: 'o3', materialId: 'm17', cantidad: 20,  estado: 'publicada', registradoPor: 'u8', fechaRegistro: '2026-10-20', publicadoPor: 'u4', fechaPublicacion: '2026-10-21' },
        { id: 'e8', obraId: 'o1', materialId: 'm4',  cantidad: 8,   estado: 'borrador',  registradoPor: 'u6', fechaRegistro: '2026-11-01', publicadoPor: null,  fechaPublicacion: null },
        { id: 'e9', obraId: 'o4', materialId: 'm14', cantidad: 15,  estado: 'borrador',  registradoPor: 'u5', fechaRegistro: '2026-11-02', publicadoPor: null,  fechaPublicacion: null },
    ];

    const DEFAULT_SOLICITUDES = [
        { id: 's1', materialId: 'm1',  cantidad: 10, obraOrigenId: 'o1', obraDestinoId: 'o2', excedenciaId: 'e1', estado: 'pendiente',  solicitadoPor: 'u3', fechaSolicitud: '2026-10-30', resueltoPor: null, fechaResolucion: null, notas: 'Necesitamos cemento urgente para la 2ª planta.' },
        { id: 's2', materialId: 'm6',  cantidad: 100, obraOrigenId: 'o1', obraDestinoId: 'o4', excedenciaId: 'e2', estado: 'aceptada',   solicitadoPor: 'u5', fechaSolicitud: '2026-10-28', resueltoPor: 'u2', fechaResolucion: '2026-10-29', notas: 'Para tabiquería interior.' },
    ];


    // ──────────────────────────────────────────────────
    // STATE MANAGEMENT
    // ──────────────────────────────────────────────────

    const STORAGE_KEY = 'mg_excedencias_app';

    let state = {
        users: [],
        materials: [],
        obras: [],
        excedencias: [],
        solicitudes: [],
        currentUser: null,
    };

    function loadState() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                state.users = parsed.users || DEFAULT_USERS;
                state.materials = parsed.materials || DEFAULT_MATERIALS;
                state.obras = parsed.obras || DEFAULT_OBRAS;
                state.excedencias = parsed.excedencias || DEFAULT_EXCEDENCIAS;
                state.solicitudes = parsed.solicitudes || DEFAULT_SOLICITUDES;
                state.currentUser = parsed.currentUser || null;
            } catch (e) {
                initDefaults();
            }
        } else {
            initDefaults();
        }
    }

    function initDefaults() {
        state.users = JSON.parse(JSON.stringify(DEFAULT_USERS));
        state.materials = JSON.parse(JSON.stringify(DEFAULT_MATERIALS));
        state.obras = JSON.parse(JSON.stringify(DEFAULT_OBRAS));
        state.excedencias = JSON.parse(JSON.stringify(DEFAULT_EXCEDENCIAS));
        state.solicitudes = JSON.parse(JSON.stringify(DEFAULT_SOLICITUDES));
        state.currentUser = null;
    }

    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function generateId(prefix) {
        return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    }


    // ──────────────────────────────────────────────────
    // HELPERS
    // ──────────────────────────────────────────────────

    function $(id) { return document.getElementById(id); }
    function $$(sel, root) { return (root || document).querySelectorAll(sel); }

    function getMaterial(id)  { return state.materials.find(m => m.id === id); }
    function getObra(id)      { return state.obras.find(o => o.id === id); }
    function getUser(id)      { return state.users.find(u => u.id === id); }

    function getExcedenciasPublicadasPorMaterial(materialId) {
        return state.excedencias.filter(e => e.materialId === materialId && e.estado === 'publicada');
    }

    function getTotalExcedenciasMaterial(materialId) {
        return getExcedenciasPublicadasPorMaterial(materialId)
            .reduce((sum, e) => sum + e.cantidad, 0);
    }

    function getTrafficLight(materialId) {
        const total = getTotalExcedenciasMaterial(materialId);
        if (total >= 20) return 'green';
        if (total >= 1)  return 'yellow';
        return 'red';
    }

    function getExcedenciasObra(obraId) {
        return state.excedencias.filter(e => e.obraId === obraId);
    }

    function canUserManageObra(user, obraId) {
        if (user.role === 'admin') return true;
        return user.obraId === obraId;
    }

    function roleLabel(role) {
        const labels = {
            admin: 'Administrador',
            jefe_obra: 'Jefe de Obra',
            encargado: 'Encargado',
        };
        return labels[role] || role;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    function todayStr() {
        return new Date().toISOString().split('T')[0];
    }


    // ──────────────────────────────────────────────────
    // TOAST NOTIFICATIONS
    // ──────────────────────────────────────────────────

    function showToast(message, type) {
        type = type || 'info';
        const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
        const container = $('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        toast.innerHTML = '<span class="toast-icon">' + icons[type] + '</span><span>' + message + '</span>';
        container.appendChild(toast);
        setTimeout(function () { toast.remove(); }, 4000);
    }


    // ──────────────────────────────────────────────────
    // MODAL
    // ──────────────────────────────────────────────────

    function showModal(title, bodyHtml, footerHtml) {
        $('modal-title').textContent = title;
        $('modal-body').innerHTML = bodyHtml;
        $('modal-footer').innerHTML = footerHtml || '';
        $('modal-overlay').classList.remove('hidden');
    }

    function hideModal() {
        $('modal-overlay').classList.add('hidden');
    }


    // ──────────────────────────────────────────────────
    // AUTH
    // ──────────────────────────────────────────────────

    function login(email, password) {
        const user = state.users.find(function (u) {
            return u.email === email && u.password === password;
        });
        if (user) {
            state.currentUser = user;
            saveState();
            showApp();
            return true;
        }
        return false;
    }

    function logout() {
        state.currentUser = null;
        saveState();
        $('app').classList.add('hidden');
        $('login-screen').classList.remove('hidden');
        $('login-email').value = '';
        $('login-password').value = '';
        $('login-error').classList.add('hidden');
    }

    function showApp() {
        $('login-screen').classList.add('hidden');
        $('app').classList.remove('hidden');
        updateUserInfo();
        applyPermissions();
        navigateTo('dashboard');
    }

    function updateUserInfo() {
        var u = state.currentUser;
        $('user-name').textContent = u.name;
        $('user-role').textContent = roleLabel(u.role);
        var initials = u.name.split(' ').map(function (w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
        $('user-avatar').textContent = initials;
    }

    function applyPermissions() {
        var u = state.currentUser;
        // Encargados only see Obras (their own) and Materiales
        if (u.role === 'encargado') {
            $$('.nav-link[data-section="solicitudes"]').forEach(function (el) { el.style.display = 'none'; });
        } else {
            $$('.nav-link[data-section="solicitudes"]').forEach(function (el) { el.style.display = ''; });
        }
    }


    // ──────────────────────────────────────────────────
    // NAVIGATION
    // ──────────────────────────────────────────────────

    let currentSection = 'dashboard';
    let currentObraId = null;

    function navigateTo(section) {
        currentSection = section;

        // Hide all sections
        $$('.section').forEach(function (el) { el.classList.add('hidden'); });

        // Deactivate all nav links
        $$('.nav-link').forEach(function (el) { el.classList.remove('active'); });

        // Map section to a base section for nav highlighting
        var navSection = section;
        if (section === 'obra-detail') navSection = 'obras';
        if (section === 'new-solicitud') navSection = 'solicitudes';

        // Activate nav
        var navLink = document.querySelector('.nav-link[data-section="' + navSection + '"]');
        if (navLink) navLink.classList.add('active');

        // Show target section
        var sectionEl = $('sec-' + section);
        if (sectionEl) sectionEl.classList.remove('hidden');

        // Update title
        var titles = {
            dashboard: 'Panel de Control',
            materiales: 'Catálogo de Materiales',
            obras: 'Obras',
            'obra-detail': 'Detalle de Obra',
            solicitudes: 'Solicitudes',
            'new-solicitud': 'Nueva Solicitud',
        };
        $('page-title').textContent = titles[section] || '';

        // Render section
        switch (section) {
            case 'dashboard':      renderDashboard(); break;
            case 'materiales':     renderMateriales(); break;
            case 'obras':          renderObras(); break;
            case 'obra-detail':    renderObraDetail(); break;
            case 'solicitudes':    renderSolicitudes(); break;
            case 'new-solicitud':  renderNewSolicitud(); break;
        }

        // Close sidebar on mobile
        $('sidebar').classList.remove('open');

        // Update solicitudes badge
        updateSolicitudesBadge();
    }

    function updateSolicitudesBadge() {
        var pending = state.solicitudes.filter(function (s) { return s.estado === 'pendiente'; }).length;
        var badge = $('badge-solicitudes');
        if (pending > 0) {
            badge.textContent = pending;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }


    // ──────────────────────────────────────────────────
    // RENDER: DASHBOARD
    // ──────────────────────────────────────────────────

    function renderDashboard() {
        $('stat-materiales').textContent = state.materials.length;
        $('stat-excedencias').textContent = state.excedencias.filter(function (e) { return e.estado === 'publicada'; }).length;
        $('stat-obras').textContent = state.obras.filter(function (o) { return o.status === 'activa'; }).length;
        $('stat-solicitudes').textContent = state.solicitudes.filter(function (s) { return s.estado === 'pendiente'; }).length;

        // Recent solicitudes
        var recentSol = state.solicitudes.slice().sort(function (a, b) { return b.fechaSolicitud.localeCompare(a.fechaSolicitud); }).slice(0, 5);
        var solHtml = '';
        if (recentSol.length === 0) {
            solHtml = '<div class="empty-state"><p>No hay solicitudes aún.</p></div>';
        } else {
            recentSol.forEach(function (s) {
                var mat = getMaterial(s.materialId);
                var destino = getObra(s.obraDestinoId);
                var icons = { pendiente: '⏳', aceptada: '✅', rechazada: '❌' };
                solHtml += '<div class="dash-list-item">' +
                    '<span class="dash-list-icon">' + (icons[s.estado] || '📋') + '</span>' +
                    '<span class="dash-list-text"><strong>' + (mat ? mat.name : '?') + '</strong> × ' + s.cantidad + ' → ' + (destino ? destino.name : '?') + '</span>' +
                    '<span class="dash-list-badge"><span class="badge badge-' + s.estado + '">' + s.estado + '</span></span>' +
                    '</div>';
            });
        }
        $('dashboard-solicitudes').innerHTML = solHtml;

        // Recent excedencias
        var recentExc = state.excedencias.filter(function (e) { return e.estado === 'publicada'; })
            .sort(function (a, b) { return (b.fechaPublicacion || '').localeCompare(a.fechaPublicacion || ''); }).slice(0, 5);
        var excHtml = '';
        if (recentExc.length === 0) {
            excHtml = '<div class="empty-state"><p>No hay excedencias publicadas.</p></div>';
        } else {
            recentExc.forEach(function (e) {
                var mat = getMaterial(e.materialId);
                var obra = getObra(e.obraId);
                excHtml += '<div class="dash-list-item">' +
                    '<span class="dash-list-icon">📦</span>' +
                    '<span class="dash-list-text"><strong>' + (mat ? mat.name : '?') + '</strong> × ' + e.cantidad + ' ' + (mat ? mat.unit : '') + ' — ' + (obra ? obra.name : '?') + '</span>' +
                    '<span class="dash-list-badge"><span class="traffic-light ' + getTrafficLight(e.materialId) + '"></span></span>' +
                    '</div>';
            });
        }
        $('dashboard-excedencias').innerHTML = excHtml;
    }


    // ──────────────────────────────────────────────────
    // RENDER: MATERIALES
    // ──────────────────────────────────────────────────

    let materialFilter = 'all';
    let materialSearch = '';

    function renderMateriales() {
        var container = $('materiales-grid');
        var filtered = state.materials.filter(function (m) {
            // Search filter
            if (materialSearch && m.name.toLowerCase().indexOf(materialSearch.toLowerCase()) === -1 &&
                m.category.toLowerCase().indexOf(materialSearch.toLowerCase()) === -1) return false;
            // Traffic light filter
            if (materialFilter !== 'all' && getTrafficLight(m.id) !== materialFilter) return false;
            return true;
        });

        if (filtered.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No se encontraron materiales.</p></div>';
            return;
        }

        var html = '';
        filtered.forEach(function (m) {
            var light = getTrafficLight(m.id);
            var total = getTotalExcedenciasMaterial(m.id);
            var excedencias = getExcedenciasPublicadasPorMaterial(m.id);

            var detalleObras = '';
            if (excedencias.length > 0) {
                detalleObras = excedencias.map(function (e) {
                    var obra = getObra(e.obraId);
                    return (obra ? obra.name : '?') + ': ' + e.cantidad + ' ' + m.unit;
                }).join(' · ');
            } else {
                detalleObras = 'Ninguna obra dispone de excedencias';
            }

            html += '<div class="material-card highlight-' + light + '">' +
                '<span class="traffic-light ' + light + '"></span>' +
                '<div class="material-card-info">' +
                    '<div class="material-card-name">' + m.name + '</div>' +
                    '<div class="material-card-category">' + m.category + ' · ' + m.unit + '</div>' +
                    '<div class="material-card-excedencias">' +
                        'Excedencias totales: <strong>' + total + ' ' + m.unit + '</strong>' +
                        '<br><small class="text-muted">' + detalleObras + '</small>' +
                    '</div>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }


    // ──────────────────────────────────────────────────
    // RENDER: OBRAS
    // ──────────────────────────────────────────────────

    function renderObras() {
        var container = $('obras-grid');
        var user = state.currentUser;
        var obrasToShow = state.obras;

        // Encargado only sees their own obra
        if (user.role === 'encargado') {
            obrasToShow = obrasToShow.filter(function (o) { return o.id === user.obraId; });
        }

        if (obrasToShow.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No hay obras disponibles.</p></div>';
            return;
        }

        var html = '';
        obrasToShow.forEach(function (o) {
            var excedencias = getExcedenciasObra(o.id);
            var publicadas = excedencias.filter(function (e) { return e.estado === 'publicada'; }).length;
            var borradores = excedencias.filter(function (e) { return e.estado === 'borrador'; }).length;
            var solicitudesEntrada = state.solicitudes.filter(function (s) { return s.obraOrigenId === o.id && s.estado === 'pendiente'; }).length;

            html += '<div class="obra-card" data-obra-id="' + o.id + '">' +
                '<div class="obra-card-header">' +
                    '<div class="obra-card-title">' + o.name + '</div>' +
                    '<span class="obra-card-status status-' + o.status + '">' + o.status + '</span>' +
                '</div>' +
                '<div class="obra-card-address">📍 ' + o.address + '</div>' +
                '<div class="obra-card-stats">' +
                    '<div class="obra-stat"><span class="obra-stat-value">' + publicadas + '</span><span class="obra-stat-label">Publicadas</span></div>' +
                    '<div class="obra-stat"><span class="obra-stat-value">' + borradores + '</span><span class="obra-stat-label">Borradores</span></div>' +
                    '<div class="obra-stat"><span class="obra-stat-value">' + solicitudesEntrada + '</span><span class="obra-stat-label">Sol. pendientes</span></div>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;

        // Attach click handlers
        $$('.obra-card', container).forEach(function (card) {
            card.addEventListener('click', function () {
                currentObraId = card.getAttribute('data-obra-id');
                navigateTo('obra-detail');
            });
        });
    }


    // ──────────────────────────────────────────────────
    // RENDER: OBRA DETAIL
    // ──────────────────────────────────────────────────

    function renderObraDetail() {
        if (!currentObraId) { navigateTo('obras'); return; }
        var obra = getObra(currentObraId);
        if (!obra) { navigateTo('obras'); return; }

        var user = state.currentUser;
        var canManageExcedencias = canUserManageObra(user, obra.id);
        var canPublish = user.role === 'jefe_obra' || user.role === 'admin';

        $('obra-detail-title').textContent = obra.name;
        $('obra-detail-address').textContent = '📍 ' + obra.address;

        // Badges
        var excedencias = getExcedenciasObra(obra.id);
        var pub = excedencias.filter(function (e) { return e.estado === 'publicada'; }).length;
        var draft = excedencias.filter(function (e) { return e.estado === 'borrador'; }).length;
        $('obra-detail-badges').innerHTML =
            '<span class="badge badge-publicada">' + pub + ' publicadas</span> ' +
            '<span class="badge badge-borrador">' + draft + ' borradores</span>';

        // Material checklist (left panel)
        var cardRegistrar = $('card-registrar-excedencias');
        if (canManageExcedencias) {
            cardRegistrar.classList.remove('hidden');
            renderMaterialChecklist(obra.id);
        } else {
            cardRegistrar.classList.add('hidden');
        }

        // Excedencias table (right panel)
        renderExcedenciasTable(obra.id, canPublish, canManageExcedencias);
    }

    function renderMaterialChecklist(obraId) {
        var container = $('material-checklist');
        var excedencias = getExcedenciasObra(obraId);
        var filterText = ($('search-material-obra') && $('search-material-obra').value || '').toLowerCase();

        var html = '';
        state.materials.forEach(function (m) {
            if (filterText && m.name.toLowerCase().indexOf(filterText) === -1) return;

            var existing = excedencias.find(function (e) { return e.materialId === m.id; });
            var checked = existing ? 'checked' : '';
            var qty = existing ? existing.cantidad : '';
            var itemClass = existing ? 'material-checklist-item checked' : 'material-checklist-item';

            html += '<div class="' + itemClass + '">' +
                '<input type="checkbox" id="chk-' + m.id + '" data-material-id="' + m.id + '" ' + checked + '>' +
                '<label for="chk-' + m.id + '">' + m.name + '</label>' +
                '<input type="number" min="1" data-qty-for="' + m.id + '" value="' + qty + '" placeholder="0">' +
                '<span class="unit-label">' + m.unit + '</span>' +
                '</div>';
        });
        container.innerHTML = html;

        // Toggle highlight on check
        $$('input[type="checkbox"]', container).forEach(function (chk) {
            chk.addEventListener('change', function () {
                var item = chk.closest('.material-checklist-item');
                if (chk.checked) {
                    item.classList.add('checked');
                    var qtyInput = item.querySelector('input[type="number"]');
                    if (!qtyInput.value || qtyInput.value === '0') qtyInput.value = 1;
                    qtyInput.focus();
                } else {
                    item.classList.remove('checked');
                }
            });
        });
    }

    function renderExcedenciasTable(obraId, canPublish, canManage) {
        var excedencias = getExcedenciasObra(obraId);
        var tbody = $('excedencias-tbody');
        var emptyEl = $('excedencias-empty');

        if (excedencias.length === 0) {
            $('excedencias-table').classList.add('hidden');
            emptyEl.classList.remove('hidden');
            return;
        }

        $('excedencias-table').classList.remove('hidden');
        emptyEl.classList.add('hidden');

        var html = '';
        excedencias.forEach(function (e) {
            var mat = getMaterial(e.materialId);
            var actions = '';

            if (e.estado === 'borrador' && canPublish) {
                actions += '<button class="btn btn-success btn-sm btn-publish" data-exc-id="' + e.id + '">✓ Publicar</button> ';
            }
            if (canManage) {
                actions += '<button class="btn btn-danger btn-sm btn-delete-exc" data-exc-id="' + e.id + '">🗑</button>';
            }

            html += '<tr>' +
                '<td><strong>' + (mat ? mat.name : '?') + '</strong><br><small class="text-muted">' + (mat ? mat.category : '') + '</small></td>' +
                '<td>' + e.cantidad + ' ' + (mat ? mat.unit : '') + '</td>' +
                '<td><span class="badge badge-' + e.estado + '">' + e.estado + '</span></td>' +
                '<td class="actions-cell">' + actions + '</td>' +
                '</tr>';
        });
        tbody.innerHTML = html;

        // Publish buttons
        $$('.btn-publish', tbody).forEach(function (btn) {
            btn.addEventListener('click', function (ev) {
                ev.stopPropagation();
                var excId = btn.getAttribute('data-exc-id');
                var exc = state.excedencias.find(function (e) { return e.id === excId; });
                var mat = getMaterial(exc.materialId);

                showModal('Publicar Excedencia',
                    '<p class="confirm-text">¿Confirmas que el material <strong>' + (mat ? mat.name : '?') + '</strong> (' + exc.cantidad + ' ' + (mat ? mat.unit : '') + ') ya <strong>no se necesita</strong> en esta obra y queda disponible para otras obras?</p>' +
                    '<p class="confirm-text mt-1" style="color: var(--text-muted); font-size: 0.85rem;">⚠️ Al publicar, el material será visible para todas las obras y podrá ser solicitado.</p>',
                    '<button class="btn btn-secondary" onclick="window._hideModal()">Cancelar</button>' +
                    '<button class="btn btn-success" onclick="window._publishExcedencia(\'' + excId + '\')">✓ Confirmar y Publicar</button>'
                );
            });
        });

        // Delete buttons
        $$('.btn-delete-exc', tbody).forEach(function (btn) {
            btn.addEventListener('click', function (ev) {
                ev.stopPropagation();
                var excId = btn.getAttribute('data-exc-id');
                showModal('Eliminar Excedencia',
                    '<p class="confirm-text">¿Estás seguro de que deseas eliminar esta excedencia?</p>',
                    '<button class="btn btn-secondary" onclick="window._hideModal()">Cancelar</button>' +
                    '<button class="btn btn-danger" onclick="window._deleteExcedencia(\'' + excId + '\')">🗑 Eliminar</button>'
                );
            });
        });
    }


    // ──────────────────────────────────────────────────
    // RENDER: SOLICITUDES
    // ──────────────────────────────────────────────────

    let solicitudFilter = 'all';

    function renderSolicitudes() {
        var user = state.currentUser;
        var container = $('solicitudes-list');

        var filtered = state.solicitudes.filter(function (s) {
            if (solicitudFilter !== 'all' && s.estado !== solicitudFilter) return false;
            return true;
        });

        // Sort by date desc
        filtered.sort(function (a, b) { return b.fechaSolicitud.localeCompare(a.fechaSolicitud); });

        if (filtered.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No hay solicitudes que mostrar.</p></div>';
            return;
        }

        var html = '';
        filtered.forEach(function (s) {
            var mat = getMaterial(s.materialId);
            var origen = getObra(s.obraOrigenId);
            var destino = getObra(s.obraDestinoId);
            var solicitante = getUser(s.solicitadoPor);
            var icons = { pendiente: '⏳', aceptada: '✅', rechazada: '❌' };

            var actions = '';
            // Jefe de obra of the ORIGIN obra (or admin) can accept/reject pending
            if (s.estado === 'pendiente' && (user.role === 'admin' || (user.role === 'jefe_obra' && user.obraId === s.obraOrigenId))) {
                actions = '<button class="btn btn-success btn-sm btn-accept-sol" data-sol-id="' + s.id + '">✓ Aceptar</button>' +
                          '<button class="btn btn-danger btn-sm btn-reject-sol" data-sol-id="' + s.id + '">✗ Rechazar</button>';
            }

            html += '<div class="solicitud-card sol-' + s.estado + '">' +
                '<span class="solicitud-icon">' + (icons[s.estado] || '📋') + '</span>' +
                '<div class="solicitud-info">' +
                    '<div class="solicitud-title">' + (mat ? mat.name : '?') + ' × ' + s.cantidad + ' ' + (mat ? mat.unit : '') + '</div>' +
                    '<div class="solicitud-meta">' +
                        '<span>📤 De: <strong>' + (origen ? origen.name : '?') + '</strong></span>' +
                        '<span>📥 Para: <strong>' + (destino ? destino.name : '?') + '</strong></span>' +
                        '<span>📅 ' + formatDate(s.fechaSolicitud) + '</span>' +
                    '</div>' +
                    (s.notas ? '<div class="solicitud-meta mt-1" style="font-style:italic;">💬 ' + s.notas + '</div>' : '') +
                '</div>' +
                '<span class="badge badge-' + s.estado + '" style="flex-shrink:0;">' + s.estado + '</span>' +
                (actions ? '<div class="solicitud-actions">' + actions + '</div>' : '') +
                '</div>';
        });
        container.innerHTML = html;

        // Attach action handlers
        $$('.btn-accept-sol', container).forEach(function (btn) {
            btn.addEventListener('click', function () {
                acceptSolicitud(btn.getAttribute('data-sol-id'));
            });
        });

        $$('.btn-reject-sol', container).forEach(function (btn) {
            btn.addEventListener('click', function () {
                rejectSolicitud(btn.getAttribute('data-sol-id'));
            });
        });
    }


    // ──────────────────────────────────────────────────
    // RENDER: NEW SOLICITUD
    // ──────────────────────────────────────────────────

    function renderNewSolicitud() {
        // Populate obra select
        var obraSelect = $('sol-obra-destino');
        obraSelect.innerHTML = '<option value="">Selecciona obra...</option>';
        state.obras.forEach(function (o) {
            obraSelect.innerHTML += '<option value="' + o.id + '">' + o.name + '</option>';
        });

        // Populate material select
        var matSelect = $('sol-material');
        matSelect.innerHTML = '<option value="">Selecciona material...</option>';
        state.materials.forEach(function (m) {
            matSelect.innerHTML += '<option value="' + m.id + '">' + m.name + ' (' + m.unit + ')</option>';
        });

        $('sol-cantidad').value = '';
        $('sol-unidad').value = '';
        $('sol-notas').value = '';
        $('excedencia-warning').classList.add('hidden');
        $('no-excedencia-info').classList.add('hidden');
    }

    function checkExcedenciasForSolicitud() {
        var materialId = $('sol-material').value;
        var obraDestinoId = $('sol-obra-destino').value;
        var cantidad = parseInt($('sol-cantidad').value) || 0;

        $('excedencia-warning').classList.add('hidden');
        $('no-excedencia-info').classList.add('hidden');

        if (!materialId || !obraDestinoId || cantidad <= 0) return;

        var mat = getMaterial(materialId);
        if (mat) $('sol-unidad').value = mat.unit;

        // Find published excedencias for this material in OTHER obras
        var disponibles = state.excedencias.filter(function (e) {
            return e.materialId === materialId &&
                   e.estado === 'publicada' &&
                   e.obraId !== obraDestinoId;
        });

        if (disponibles.length > 0) {
            var tbody = $('excedencias-disponibles-tbody');
            var html = '';
            disponibles.forEach(function (e) {
                var obra = getObra(e.obraId);
                html += '<tr>' +
                    '<td>' + (obra ? obra.name : '?') + '</td>' +
                    '<td><strong>' + e.cantidad + ' ' + (mat ? mat.unit : '') + '</strong></td>' +
                    '<td><button class="btn btn-success btn-sm btn-solicitar-exc" ' +
                        'data-exc-id="' + e.id + '" data-obra-id="' + e.obraId + '">' +
                        '📦 Solicitar de aquí</button></td>' +
                    '</tr>';
            });
            tbody.innerHTML = html;
            $('excedencia-warning').classList.remove('hidden');

            // Attach request buttons
            $$('.btn-solicitar-exc', tbody).forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var excId = btn.getAttribute('data-exc-id');
                    var obraOrigenId = btn.getAttribute('data-obra-id');
                    createSolicitud(materialId, cantidad, obraOrigenId, obraDestinoId, excId);
                });
            });
        } else {
            $('no-excedencia-info').classList.remove('hidden');
        }
    }


    // ──────────────────────────────────────────────────
    // ACTIONS
    // ──────────────────────────────────────────────────

    function saveExcedencias(obraId) {
        var user = state.currentUser;
        var checklist = $('material-checklist');
        var checkboxes = $$('input[type="checkbox"]', checklist);

        var updated = 0;
        var created = 0;

        checkboxes.forEach(function (chk) {
            var materialId = chk.getAttribute('data-material-id');
            var qtyInput = checklist.querySelector('input[data-qty-for="' + materialId + '"]');
            var cantidad = parseInt(qtyInput.value) || 0;
            var existing = state.excedencias.find(function (e) { return e.obraId === obraId && e.materialId === materialId; });

            if (chk.checked && cantidad > 0) {
                if (existing) {
                    existing.cantidad = cantidad;
                    updated++;
                } else {
                    state.excedencias.push({
                        id: generateId('e'),
                        obraId: obraId,
                        materialId: materialId,
                        cantidad: cantidad,
                        estado: 'borrador',
                        registradoPor: user.id,
                        fechaRegistro: todayStr(),
                        publicadoPor: null,
                        fechaPublicacion: null,
                    });
                    created++;
                }
            } else if (!chk.checked && existing) {
                // Remove if unchecked
                var idx = state.excedencias.indexOf(existing);
                if (idx > -1) state.excedencias.splice(idx, 1);
            }
        });

        saveState();
        showToast('Excedencias guardadas (' + created + ' nuevas, ' + updated + ' actualizadas)', 'success');
        renderObraDetail();
    }

    window._publishExcedencia = function (excId) {
        var exc = state.excedencias.find(function (e) { return e.id === excId; });
        if (exc) {
            exc.estado = 'publicada';
            exc.publicadoPor = state.currentUser.id;
            exc.fechaPublicacion = todayStr();
            saveState();
            hideModal();
            showToast('Excedencia publicada correctamente', 'success');
            renderObraDetail();
        }
    };

    window._deleteExcedencia = function (excId) {
        state.excedencias = state.excedencias.filter(function (e) { return e.id !== excId; });
        saveState();
        hideModal();
        showToast('Excedencia eliminada', 'warning');
        renderObraDetail();
    };

    window._hideModal = hideModal;

    function createSolicitud(materialId, cantidad, obraOrigenId, obraDestinoId, excedenciaId) {
        var user = state.currentUser;
        state.solicitudes.push({
            id: generateId('s'),
            materialId: materialId,
            cantidad: cantidad,
            obraOrigenId: obraOrigenId,
            obraDestinoId: obraDestinoId,
            excedenciaId: excedenciaId || null,
            estado: 'pendiente',
            solicitadoPor: user.id,
            fechaSolicitud: todayStr(),
            resueltoPor: null,
            fechaResolucion: null,
            notas: $('sol-notas').value || '',
        });
        saveState();
        showToast('Solicitud creada correctamente. Pendiente de aprobación del jefe de obra.', 'success');
        navigateTo('solicitudes');
    }

    function acceptSolicitud(solId) {
        var sol = state.solicitudes.find(function (s) { return s.id === solId; });
        if (sol) {
            sol.estado = 'aceptada';
            sol.resueltoPor = state.currentUser.id;
            sol.fechaResolucion = todayStr();

            // Reduce the excedencia quantity
            if (sol.excedenciaId) {
                var exc = state.excedencias.find(function (e) { return e.id === sol.excedenciaId; });
                if (exc) {
                    exc.cantidad = Math.max(0, exc.cantidad - sol.cantidad);
                    if (exc.cantidad <= 0) {
                        // Remove exhausted excedencia
                        state.excedencias = state.excedencias.filter(function (e) { return e.id !== exc.id; });
                    }
                }
            }

            saveState();
            showToast('Solicitud aceptada. El material será transferido.', 'success');
            renderSolicitudes();
            updateSolicitudesBadge();
        }
    }

    function rejectSolicitud(solId) {
        showModal('Rechazar Solicitud',
            '<p class="confirm-text">¿Estás seguro de que deseas rechazar esta solicitud?</p>',
            '<button class="btn btn-secondary" onclick="window._hideModal()">Cancelar</button>' +
            '<button class="btn btn-danger" onclick="window._doReject(\'' + solId + '\')">✗ Rechazar</button>'
        );
    }

    window._doReject = function (solId) {
        var sol = state.solicitudes.find(function (s) { return s.id === solId; });
        if (sol) {
            sol.estado = 'rechazada';
            sol.resueltoPor = state.currentUser.id;
            sol.fechaResolucion = todayStr();
            saveState();
            hideModal();
            showToast('Solicitud rechazada.', 'warning');
            renderSolicitudes();
            updateSolicitudesBadge();
        }
    };


    // ──────────────────────────────────────────────────
    // EVENT LISTENERS
    // ──────────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', function () {

        loadState();

        // If user is already logged in, show app
        if (state.currentUser) {
            showApp();
        }

        // Login form
        $('login-form').addEventListener('submit', function (ev) {
            ev.preventDefault();
            var email = $('login-email').value.trim();
            var pass = $('login-password').value;

            if (!login(email, pass)) {
                var errEl = $('login-error');
                errEl.textContent = 'Email o contraseña incorrectos. Acceso exclusivo para empleados autorizados.';
                errEl.classList.remove('hidden');
            }
        });

        // Logout
        $('btn-logout').addEventListener('click', logout);

        // Navigation
        $$('.nav-link').forEach(function (link) {
            link.addEventListener('click', function (ev) {
                ev.preventDefault();
                var section = link.getAttribute('data-section');
                if (section) navigateTo(section);
            });
        });

        // Mobile menu
        $('btn-menu').addEventListener('click', function () {
            $('sidebar').classList.toggle('open');
        });

        // Back buttons
        $('btn-back-obras').addEventListener('click', function () {
            navigateTo('obras');
        });

        $('btn-back-solicitudes').addEventListener('click', function () {
            navigateTo('solicitudes');
        });

        // New solicitud button
        $('btn-new-solicitud').addEventListener('click', function () {
            navigateTo('new-solicitud');
        });

        // Cancel solicitud
        $('btn-cancel-solicitud').addEventListener('click', function () {
            navigateTo('solicitudes');
        });

        // Save excedencias
        $('btn-save-excedencias').addEventListener('click', function () {
            if (currentObraId) saveExcedencias(currentObraId);
        });

        // Material search on materials page
        $('search-materiales').addEventListener('input', function () {
            materialSearch = this.value;
            renderMateriales();
        });

        // Material filter buttons
        $$('.btn-filter[data-filter]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                $$('.btn-filter[data-filter]').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                materialFilter = btn.getAttribute('data-filter');
                renderMateriales();
            });
        });

        // Solicitud filter buttons
        $$('.btn-filter[data-filter-sol]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                $$('.btn-filter[data-filter-sol]').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                solicitudFilter = btn.getAttribute('data-filter-sol');
                renderSolicitudes();
            });
        });

        // Material search in obra detail
        document.addEventListener('input', function (ev) {
            if (ev.target.id === 'search-material-obra') {
                renderMaterialChecklist(currentObraId);
            }
        });

        // Solicitud form: check excedencias on selection change
        $('sol-material').addEventListener('change', checkExcedenciasForSolicitud);
        $('sol-obra-destino').addEventListener('change', checkExcedenciasForSolicitud);
        $('sol-cantidad').addEventListener('input', checkExcedenciasForSolicitud);

        // Update unit display when material changes
        $('sol-material').addEventListener('change', function () {
            var mat = getMaterial(this.value);
            $('sol-unidad').value = mat ? mat.unit : '—';
        });

        // "Pedir a Proveedor" button
        $('btn-pedir-proveedor').addEventListener('click', function () {
            var materialId = $('sol-material').value;
            var obraDestinoId = $('sol-obra-destino').value;
            var cantidad = parseInt($('sol-cantidad').value) || 0;

            if (!materialId || !obraDestinoId || cantidad <= 0) {
                showToast('Completa todos los campos obligatorios.', 'error');
                return;
            }

            // Check if there are available excedencias - WARN before supplier
            var disponibles = state.excedencias.filter(function (e) {
                return e.materialId === materialId &&
                       e.estado === 'publicada' &&
                       e.obraId !== obraDestinoId;
            });

            var mat = getMaterial(materialId);

            if (disponibles.length > 0) {
                var totalDisp = disponibles.reduce(function (s, e) { return s + e.cantidad; }, 0);
                showModal('⚠️ ¡Excedencias Disponibles!',
                    '<p class="confirm-text">Hay <strong>' + totalDisp + ' ' + (mat ? mat.unit : '') + '</strong> de <strong>' + (mat ? mat.name : '') + '</strong> disponibles como excedencia en otras obras.</p>' +
                    '<p class="confirm-text mt-1">Te recomendamos solicitar el material de una obra existente antes de hacer un pedido a proveedor. Esto <strong>ahorra costes</strong> y <strong>reduce residuos</strong>.</p>' +
                    '<p class="confirm-text mt-1" style="color: var(--danger); font-weight: 600;">¿Seguro que deseas pedir a un proveedor externo?</p>',
                    '<button class="btn btn-secondary" onclick="window._hideModal()">Cancelar</button>' +
                    '<button class="btn btn-warning" onclick="window._confirmProveedor()">🚚 Sí, pedir a proveedor</button>'
                );
            } else {
                // No excedencias, allow supplier order directly
                showModal('Confirmar Pedido a Proveedor',
                    '<p class="confirm-text">No hay excedencias disponibles de <strong>' + (mat ? mat.name : '') + '</strong>.</p>' +
                    '<p class="confirm-text mt-1">Se registrará la necesidad de <strong>' + cantidad + ' ' + (mat ? mat.unit : '') + '</strong> para tramitar el pedido al proveedor.</p>',
                    '<button class="btn btn-secondary" onclick="window._hideModal()">Cancelar</button>' +
                    '<button class="btn btn-primary" onclick="window._confirmProveedor()">✓ Confirmar pedido</button>'
                );
            }
        });

        window._confirmProveedor = function () {
            hideModal();
            showToast('Pedido a proveedor registrado. Se tramitará a través del departamento de compras.', 'info');
            navigateTo('solicitudes');
        };

        // Close modal
        $('modal-close').addEventListener('click', hideModal);
        $('modal-overlay').addEventListener('click', function (ev) {
            if (ev.target === $('modal-overlay')) hideModal();
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function (ev) {
            var sidebar = $('sidebar');
            var menuBtn = $('btn-menu');
            if (sidebar.classList.contains('open') &&
                !sidebar.contains(ev.target) &&
                ev.target !== menuBtn) {
                sidebar.classList.remove('open');
            }
        });
    });

})();
