import { CartItem, Product } from '../types';

export const parseCSV = (text: string): string[][] => {
  let p = '', row: string[] = [''], ret: string[][] = [row], i = 0, r = 0, s = true;
  for (const l of text) {
    if ('"' === l) {
      if (s && l === p) row[i] += l;
      s = !s;
    } else if (',' === l && s) {
      row[++i] = '';
    } else if ('\n' === l && s) {
      if ('\r' === p) row[i] = row[i].slice(0, -1);
      row = ret[++r] = ['']; 
      i = 0;
    } else {
      row[i] += l;
    }
    p = l;
  }
  return ret.filter(row => row.length > 1 || row[0] !== '');
};

export const formatRupiah = (num: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num);
};

export const parsePrice = (priceStr: string | null | undefined): number => {
  if (!priceStr) return 0;
  let str = priceStr.toString().trim();
  // Remove trailing decimals (.00 or ,00) to avoid scaling issues
  str = str.replace(/[,.]\d{1,2}$/, '');
  const cleaned = str.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
};

export const getFormattedDate = (): string => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const d = new Date();
  const dayName = days[d.getDay()];
  const date = d.getDate().toString().padStart(2, '0');
  const monthName = months[d.getMonth()];
  const year = d.getFullYear();

  return `${dayName}, ${date} ${monthName} ${year}`;
};

export const getItemPrice = (item: CartItem): number => {
  return item.product.harga.eceran || 0;
};

export const parseDateStr = (dateStr: string | null | undefined): Date => {
  if (!dateStr) return new Date(0);
  const str = dateStr.trim();
  if (!str || str === '-') return new Date(0);
  
  // Format standard: DD-MM-YYYY HH:mm:ss
  const parts = str.split(' ');
  if (parts.length < 1) return new Date(0);
  
  const dateParts = parts[0].split('-');
  if (dateParts.length < 3) return new Date(0);
  
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // 0-based
  const year = parseInt(dateParts[2], 10);
  
  let hours = 0, minutes = 0, seconds = 0;
  if (parts[1]) {
    const timeParts = parts[1].split(':');
    hours = parseInt(timeParts[0], 10) || 0;
    minutes = parseInt(timeParts[1], 10) || 0;
    seconds = parseInt(timeParts[2], 10) || 0;
  }
  
  return new Date(year, month, day, hours, minutes, seconds);
};

export const formatIndonesianDate = (date: Date): string => {
  if (isNaN(date.getTime()) || date.getTime() === 0) return '-';
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const dayName = days[date.getDay()];
  const dateNum = date.getDate().toString().padStart(2, '0');
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  
  return `${dayName}, ${dateNum} ${monthName} ${year} ${timeStr}`;
};

export const getProductImageUrl = (product: Product | null): string => {
  if (product && product.imageId && product.imageId.trim() !== '' && product.imageId.trim() !== '-') {
    return `https://lh3.googleusercontent.com/d/${product.imageId.trim()}`;
  }
  return `https://placehold.co/600x600/f8fafc/94a3b8?text=${product ? encodeURIComponent(product.sku) : 'No+Image'}`;
};
