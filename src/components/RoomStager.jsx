import { useMemo, useState } from 'react';

const CATALOG = [
  { id: 's1', name: 'Cloud Lounge Sofa', category: 'Living Room', price: 1299, color: 'bg-stone-200' },
  { id: 'c1', name: 'Arc Dining Chair', category: 'Dining', price: 299, color: 'bg-zinc-300' },
  { id: 'b1', name: 'Halo Bed Frame', category: 'Bedroom', price: 899, color: 'bg-slate-300' },
  { id: 'l1', name: 'Nook Floor Lamp', category: 'Lighting', price: 189, color: 'bg-amber-200' }
];

export default function RoomStager() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(CATALOG[0]);
  const [roomImage, setRoomImage] = useState('');
  const [cart, setCart] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = useMemo(() => ['All', ...new Set(CATALOG.map((item) => item.category))], []);
  const filteredItems = useMemo(
    () => (selectedCategory === 'All' ? CATALOG : CATALOG.filter((item) => item.category === selectedCategory)),
    [selectedCategory]
  );

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setRoomImage(e.target?.result || '');
    reader.readAsDataURL(file);
  };

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const stageRoom = async () => {
    if (!roomImage || !selectedItem) return;

    setIsGenerating(true);

    // Starter implementation: swap this timeout with an API call to your AI backend.
    // Example backend flow:
    // 1) Upload room image + furniture mask/asset to API.
    // 2) Use Replicate ControlNet/Inpaint model to place/scale item.
    // 3) Return generated staged image URL.
    await new Promise((resolve) => setTimeout(resolve, 1400));

    setIsGenerating(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 bg-soft-radial p-4 text-slate-900 md:p-8">
      <section className="mx-auto max-w-6xl space-y-5">
        <header className="rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glass backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">AuraHome</p>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">AI Virtual Staging</h1>
            </div>
            <span className="rounded-full bg-slate-900 px-4 py-1 text-sm font-medium text-white">Cart {cart.length}</span>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-5">
          <aside className="space-y-5 lg:col-span-2">
            <article className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-card backdrop-blur-xl">
              <div className="mb-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      selectedCategory === category
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-200/80 text-slate-600 hover:bg-slate-300/90'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${
                      selectedItem.id === item.id
                        ? 'border-slate-800 bg-slate-50 shadow-card'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-medium text-slate-900">{item.name}</h2>
                        <p className="text-sm text-slate-500">{item.category}</p>
                      </div>
                      <p className="font-semibold">${item.price}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className={`h-8 w-8 rounded-lg ${item.color}`} />
                      <span className="text-xs text-slate-500">Tap to stage</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleAddToCart(selectedItem)}
                className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Add to Cart · {selectedItem.name}
              </button>
            </article>
          </aside>

          <section className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-card backdrop-blur-xl lg:col-span-3">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Room Preview</h2>
              <label className="cursor-pointer rounded-full bg-slate-200 px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-300">
                Upload Room
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>

            <div className="relative h-[420px] overflow-hidden rounded-2xl bg-slate-200">
              {roomImage ? (
                <img src={roomImage} alt="Uploaded room" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  Upload an empty room photo to start staging
                </div>
              )}

              {roomImage && selectedItem && (
                <div className="absolute bottom-5 left-5 rounded-xl border border-white/80 bg-white/90 px-4 py-2 shadow-card backdrop-blur">
                  <p className="text-xs uppercase tracking-widest text-slate-500">Selected item</p>
                  <p className="font-medium">{selectedItem.name}</p>
                </div>
              )}
            </div>

            <button
              onClick={stageRoom}
              disabled={!roomImage || isGenerating}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? 'Generating AI Stage…' : 'Generate AI Staged Room'}
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}
