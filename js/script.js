// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

if (mobileMenuBtn) {
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
  // Floating Contact Button
  const contactBtn = document.getElementById('contactBtn');
  const contactPopup = document.getElementById('contactPopup');

  if (!contactBtn || !contactPopup) return;

  // 打开弹窗（只开不关）
  function openWechatPopup() {
    contactPopup.classList.add('show');
  }

  // 按钮点击：toggle
  contactBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    contactPopup.classList.toggle('show');
  });

  // === Open popup by hash (#wechat) ===
  function openWechatPopupByHash() {
    if (window.location.hash === '#wechat') {
      openWechatPopup();
    }
  }

  window.addEventListener('hashchange', openWechatPopupByHash);
  openWechatPopupByHash(); // 首次加载带 #wechat 也能打开

  // 关键：点击 “微信链接” 时，不要让 document click 把它关掉
  document.querySelectorAll('a[href="#wechat"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // 保持 hash（可选）
      history.replaceState(null, '', '#wechat');
      openWechatPopup();
    });
  });

  // Close popup when clicking outside（排除微信触发链接）
  document.addEventListener('click', (e) => {
    const isWechatTrigger = e.target.closest('a[href="#wechat"]');
    if (isWechatTrigger) return;

    if (!contactPopup.contains(e.target) && e.target !== contactBtn) {
      contactPopup.classList.remove('show');
      // 可选：关闭时把 #wechat 清掉
      if (window.location.hash === '#wechat') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  });
});




// Copy WeChat ID
if (wechatId) {
    wechatId.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('feijia');
            showCopyNotification();
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = 'feijia';
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showCopyNotification();
            } catch (err) {
                console.error('Copy failed:', err);
            }
            document.body.removeChild(textArea);
        }
    });
}

function showCopyNotification() {
    if (copyNotification) {
        copyNotification.classList.add('show');
        setTimeout(() => {
            copyNotification.classList.remove('show');
        }, 2000);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});


// Team Banner Carousel (independent)
const teamTrack = document.getElementById('teamBannerTrack');
const teamDotsWrap = document.getElementById('teamBannerDots');
const teamSlides = teamTrack ? teamTrack.querySelectorAll('.team-banner-slide') : [];
let teamIndex = 0;
let teamTimer = null;

if (teamTrack && teamDotsWrap && teamSlides.length) {
  // create dots
  teamSlides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'team-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => teamGo(i));
    teamDotsWrap.appendChild(d);
  });

  function teamGo(i) {
    teamIndex = i;
    teamTrack.style.transform = `translateX(-${teamIndex * 100}%)`;
    teamDotsWrap.querySelectorAll('.team-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === teamIndex);
    });
  }

  function teamNext() {
    teamIndex = (teamIndex + 1) % teamSlides.length;
    teamGo(teamIndex);
  }

  // autoplay
  teamTimer = setInterval(teamNext, 3500);

  // pause on hover
  const teamSection = document.querySelector('.team-banner');
  teamSection.addEventListener('mouseenter', () => {
    if (teamTimer) clearInterval(teamTimer);
  });
  teamSection.addEventListener('mouseleave', () => {
    teamTimer = setInterval(teamNext, 3500);
  });
}
