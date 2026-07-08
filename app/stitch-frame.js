const pages = {
  home: '/stitch/haegin_homepage_desktop/code.html',
  brand: '/stitch/brand_introduction_haegin/code.html',
  collection: '/stitch/collection_haegin/code.html',
  login: '/stitch/login_haegin/code.html',
  'kr-brand': '/stitch/haegin_kr_1/code.html',
  'kr-login': '/stitch/haegin_kr_2/code.html',
  'kr-collection': '/stitch/haegin_kr_3/code.html',
};

export default function StitchFrame({ page }) {
  const src = pages[page] || pages.home;

  return (
    <iframe
      src={src}
      title="HAEGIN"
      style={{
        border: 0,
        display: 'block',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
