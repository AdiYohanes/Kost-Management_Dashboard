interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue' | 'paid';
}

interface RentPayment {
  id: string;
  residentName: string;
  unit: string;
  amount: string;
  dueDate: string;
  daysLeft: number;
}

interface KostData {
  id: string;
  name: string;
  occupancyData: {
    occupiedUnits: number;
    totalUnits: number;
    occupancyPercentage: number;
  };
  statsDataWithIcons: Array<{
    id: number;
    title: string;
    value: string;
    icon: any; // Using any for now since we can't import React elements in pure data file
    color: string;
    trend: { isUp: boolean; percentage: string; label: string };
    caption?: string;
  }>;
  transactionsData: Transaction[];
  rentData: RentPayment[];
}

const dummyKostData: Record<string, KostData> = {
  kost1: {
    id: "kost1",
    name: "Rumah Kost 1",
    occupancyData: {
      occupiedUnits: 42,
      totalUnits: 50,
      occupancyPercentage: 84,
    },
    statsDataWithIcons: [
      {
        id: 1,
        title: "Total Pendapatan",
        value: "Rp 15.2M",
        icon: "AttachMoneyIcon",
        color: "primary",
        trend: { isUp: true, percentage: "+12%", label: "dari bulan lalu" },
      },
      {
        id: 2,
        title: "Total Pengguna",
        value: "1,250",
        caption: "users",
        icon: "GroupIcon",
        color: "info",
        trend: { isUp: true, percentage: "+5%", label: "minggu ini" },
      },
      {
        id: 3,
        title: "Laundry Pending",
        value: "34",
        caption: "orders",
        icon: "LocalLaundryServiceIcon",
        color: "warning",
        trend: {
          isUp: false,
          percentage: "-2%",
          label: "lebih sedikit dari kemarin",
        },
      },
      {
        id: 4,
        title: "Unit Kost Kosong",
        value: "3",
        icon: "MeetingRoomIcon",
        color: "error",
        trend: {
          isUp: true,
          percentage: "+3",
          label: "Kamar tersedia",
        },
      },
    ],
    transactionsData: [
      {
        id: "1",
        name: "Budi Santoso",
        description: "Sewa bulan Juni",
        amount: "Rp 1.500.000",
        date: "15 Jun 2023",
        status: "paid",
      },
      {
        id: "2",
        name: "Siti Aminah",
        description: "Sewa bulan Juni",
        amount: "Rp 1.200.000",
        date: "16 Jun 2023",
        status: "pending",
      },
      {
        id: "3",
        name: "Ahmad Fauzi",
        description: "Sewa bulan Juni",
        amount: "Rp 1.800.000",
        date: "10 Jun 2023",
        status: "overdue",
      },
      {
        id: "4",
        name: "Rina Kartika",
        description: "Sewa bulan Juni",
        amount: "Rp 1.400.000",
        date: "12 Jun 2023",
        status: "paid",
      },
      {
        id: "5",
        name: "Dedi Prasetyo",
        description: "Sewa bulan Juni",
        amount: "Rp 1.600.000",
        date: "18 Jun 2023",
        status: "pending",
      },
    ],
    rentData: [
      {
        id: "1",
        residentName: "Budi Santoso",
        unit: "A-101",
        amount: "Rp 1.500.000",
        dueDate: "5 Jul 2023",
        daysLeft: 3,
      },
      {
        id: "2",
        residentName: "Siti Aminah",
        unit: "B-202",
        amount: "Rp 1.200.000",
        dueDate: "7 Jul 2023",
        daysLeft: 5,
      },
      {
        id: "3",
        residentName: "Ahmad Fauzi",
        unit: "C-301",
        amount: "Rp 1.800.000",
        dueDate: "Today",
        daysLeft: 0,
      },
      {
        id: "4",
        residentName: "Rina Kartika",
        unit: "A-103",
        amount: "Rp 1.400.000",
        dueDate: "3 Jul 2023",
        daysLeft: 1,
      },
      {
        id: "5",
        residentName: "Dedi Prasetyo",
        unit: "D-401",
        amount: "Rp 1.600.000",
        dueDate: "8 Jul 2023",
        daysLeft: 6,
      },
    ],
  },
  kost2: {
    id: "kost2",
    name: "Rumah Kost 2",
    occupancyData: {
      occupiedUnits: 38,
      totalUnits: 45,
      occupancyPercentage: 84,
    },
    statsDataWithIcons: [
      {
        id: 1,
        title: "Total Pendapatan",
        value: "Rp 12.8M",
        icon: "AttachMoneyIcon",
        color: "primary",
        trend: { isUp: true, percentage: "+8%", label: "dari bulan lalu" },
      },
      {
        id: 2,
        title: "Total Pengguna",
        value: "980",
        caption: "users",
        icon: "GroupIcon",
        color: "info",
        trend: { isUp: true, percentage: "+3%", label: "minggu ini" },
      },
      {
        id: 3,
        title: "Laundry Pending",
        value: "21",
        caption: "orders",
        icon: "LocalLaundryServiceIcon",
        color: "warning",
        trend: {
          isUp: false,
          percentage: "-5%",
          label: "lebih sedikit dari kemarin",
        },
      },
      {
        id: 4,
        title: "Unit Kost Kosong",
        value: "2",
        icon: "MeetingRoomIcon",
        color: "error",
        trend: {
          isUp: true,
          percentage: "+2",
          label: "Kamar tersedia",
        },
      },
    ],
    transactionsData: [
      {
        id: "1",
        name: "Joko Widodo",
        description: "Sewa bulan Juni",
        amount: "Rp 1.300.000",
        date: "16 Jun 2023",
        status: "paid",
      },
      {
        id: "2",
        name: "Megawati Sukarno",
        description: "Sewa bulan Juni",
        amount: "Rp 1.100.000",
        date: "17 Jun 2023",
        status: "pending",
      },
      {
        id: "3",
        name: "Prabowo Subianto",
        description: "Sewa bulan Juni",
        amount: "Rp 1.600.000",
        date: "12 Jun 2023",
        status: "paid",
      },
      {
        id: "4",
        name: "Anies Baswedan",
        description: "Sewa bulan Juni",
        amount: "Rp 1.250.000",
        date: "14 Jun 2023",
        status: "paid",
      },
      {
        id: "5",
        name: "Ganjar Pranowo",
        description: "Sewa bulan Juni",
        amount: "Rp 1.450.000",
        date: "20 Jun 2023",
        status: "pending",
      },
    ],
    rentData: [
      {
        id: "1",
        residentName: "Joko Widodo",
        unit: "B-101",
        amount: "Rp 1.300.000",
        dueDate: "7 Jul 2023",
        daysLeft: 5,
      },
      {
        id: "2",
        residentName: "Megawati Sukarno",
        unit: "C-202",
        amount: "Rp 1.100.000",
        dueDate: "9 Jul 2023",
        daysLeft: 7,
      },
      {
        id: "3",
        residentName: "Prabowo Subianto",
        unit: "D-301",
        amount: "Rp 1.600.000",
        dueDate: "Today",
        daysLeft: 0,
      },
      {
        id: "4",
        residentName: "Anies Baswedan",
        unit: "B-103",
        amount: "Rp 1.250.000",
        dueDate: "5 Jul 2023",
        daysLeft: 3,
      },
      {
        id: "5",
        residentName: "Ganjar Pranowo",
        unit: "E-401",
        amount: "Rp 1.450.000",
        dueDate: "10 Jul 2023",
        daysLeft: 8,
      },
    ],
  },
  kost3: {
    id: "kost3",
    name: "Rumah Kost 3",
    occupancyData: {
      occupiedUnits: 25,
      totalUnits: 30,
      occupancyPercentage: 83,
    },
    statsDataWithIcons: [
      {
        id: 1,
        title: "Total Pendapatan",
        value: "Rp 8.5M",
        icon: "AttachMoneyIcon",
        color: "primary",
        trend: { isUp: true, percentage: "+15%", label: "dari bulan lalu" },
      },
      {
        id: 2,
        title: "Total Pengguna",
        value: "250",
        caption: "users",
        icon: "GroupIcon",
        color: "info",
        trend: { isUp: true, percentage: "+8%", label: "minggu ini" },
      },
      {
        id: 3,
        title: "Laundry Pending",
        value: "15",
        caption: "orders",
        icon: "LocalLaundryServiceIcon",
        color: "warning",
        trend: {
          isUp: false,
          percentage: "-10%",
          label: "lebih sedikit dari kemarin",
        },
      },
      {
        id: 4,
        title: "Unit Kost Kosong",
        value: "5",
        icon: "MeetingRoomIcon",
        color: "error",
        trend: {
          isUp: true,
          percentage: "+5",
          label: "Kamar tersedia",
        },
      },
    ],
    transactionsData: [
      {
        id: "1",
        name: "Susilo Bambang",
        description: "Sewa bulan Juni",
        amount: "Rp 1.400.000",
        date: "16 Jun 2023",
        status: "paid",
      },
      {
        id: "2",
        name: "Aburizal Bakrie",
        description: "Sewa bulan Juni",
        amount: "Rp 1.000.000",
        date: "18 Jun 2023",
        status: "pending",
      },
      {
        id: "3",
        name: "Surya Paloh",
        description: "Sewa bulan Juni",
        amount: "Rp 1.700.000",
        date: "11 Jun 2023",
        status: "paid",
      },
      {
        id: "4",
        name: "Rizal Ramli",
        description: "Sewa bulan Juni",
        amount: "Rp 1.350.000",
        date: "13 Jun 2023",
        status: "paid",
      },
      {
        id: "5",
        name: "Ernest Prakasa",
        description: "Sewa bulan Juni",
        amount: "Rp 1.550.000",
        date: "19 Jun 2023",
        status: "pending",
      },
    ],
    rentData: [
      {
        id: "1",
        residentName: "Susilo Bambang",
        unit: "A-101",
        amount: "Rp 1.400.000",
        dueDate: "6 Jul 2023",
        daysLeft: 4,
      },
      {
        id: "2",
        residentName: "Aburizal Bakrie",
        unit: "B-202",
        amount: "Rp 1.000.000",
        dueDate: "8 Jul 2023",
        daysLeft: 6,
      },
      {
        id: "3",
        residentName: "Surya Paloh",
        unit: "C-301",
        amount: "Rp 1.700.000",
        dueDate: "Today",
        daysLeft: 0,
      },
      {
        id: "4",
        residentName: "Rizal Ramli",
        unit: "A-103",
        amount: "Rp 1.350.000",
        dueDate: "4 Jul 2023",
        daysLeft: 2,
      },
      {
        id: "5",
        residentName: "Ernest Prakasa",
        unit: "D-401",
        amount: "Rp 1.550.000",
        dueDate: "9 Jul 2023",
        daysLeft: 7,
      },
    ],
  },
};

export default dummyKostData;