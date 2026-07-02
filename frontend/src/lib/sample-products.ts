import {
  BarChart3,
  Bot,
  Calendar,
  CreditCard,
  Inbox,
  MessagesSquare,
  Package,
  ShoppingBag,
  type LucideIcon
} from "lucide-react";
import type { AiScreen, Accent } from "@/components/effects/ai-app-screens";

export type ProductFeature = {
  icon: LucideIcon;
  title: string;
  text: string;
  screen?: AiScreen;
};

/**
 * Sản phẩm mẫu (curated). Shape map sẵn sang model Prisma `Product` cho
 * giai đoạn 2 (CMS + upload): slug/name/tagline/category/... + images[].
 */
export type SampleProduct = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  platform: string;
  summary: string;
  featured?: boolean;
  accent: Accent;
  heroScreens: AiScreen[];
  previewScreen: AiScreen;
  tags: string[];
  metrics: { value: string; label: string }[];
  features: ProductFeature[];
  techStack: string[];
};

export const sampleProducts: SampleProduct[] = [
  {
    slug: "tro-ly-ai-cskh",
    name: "Trợ Lý AI CSKH & Bán Hàng",
    tagline:
      "Tự động trả lời khách 24/7, tư vấn và chốt đơn ngay trong tin nhắn — trên mọi kênh.",
    category: "Ứng dụng AI · CSKH & Bán hàng",
    platform: "Mobile · iOS & Android",
    featured: true,
    accent: { from: "hsl(247 84% 62%)", to: "hsl(275 82% 63%)" },
    summary:
      "Ứng dụng di động giúp doanh nghiệp tự động chăm sóc khách hàng bằng AI: trả lời tức thì, tư vấn sản phẩm, gộp hội thoại từ Zalo · Messenger · Website và chốt đơn ngay trong khung chat. Nhân viên chỉ cần duyệt lại — tiết kiệm thời gian, tăng tỷ lệ chốt.",
    heroScreens: ["inbox", "chat", "order"],
    previewScreen: "chat",
    tags: ["AI Chat", "Đa kênh", "Chốt đơn", "Realtime"],
    metrics: [
      { value: "−70%", label: "thời gian phản hồi" },
      { value: "24/7", label: "trực chat tự động" },
      { value: "+35%", label: "tỷ lệ chốt đơn" },
      { value: "3 kênh", label: "Zalo · Mess · Web" }
    ],
    features: [
      {
        icon: MessagesSquare,
        title: "Trả lời tức thì bằng AI",
        text: "AI hiểu ngữ cảnh, tư vấn đúng sản phẩm, gửi kèm thẻ hàng và giá — trả lời trong vài giây kể cả ngoài giờ hành chính.",
        screen: "chat"
      },
      {
        icon: Inbox,
        title: "Hộp thư hợp nhất đa kênh",
        text: "Gộp tin nhắn từ Zalo, Messenger và website về một nơi. AI tự phân loại, đánh dấu hội thoại đã xử lý để nhân viên tập trung việc quan trọng.",
        screen: "inbox"
      },
      {
        icon: ShoppingBag,
        title: "Chốt đơn ngay trong chat",
        text: "AI tự tổng hợp sản phẩm, số lượng, tên, số điện thoại và địa chỉ từ hội thoại thành đơn hàng hoàn chỉnh — chỉ cần xác nhận một chạm.",
        screen: "order"
      },
      {
        icon: BarChart3,
        title: "Phân tích & báo cáo",
        text: "Theo dõi số hội thoại, tỷ lệ chốt, thời gian phản hồi và mức hài lòng khách hàng theo thời gian thực để tối ưu vận hành.",
        screen: "analytics"
      }
    ],
    techStack: ["React Native", "Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Node.js"]
  },
  {
    slug: "app-dat-lich-spa",
    name: "App Đặt Lịch & CSKH Spa",
    tagline:
      "Khách tự đặt lịch trên điện thoại, AI nhắc hẹn tự động, giảm hẳn trống lịch và quên hẹn.",
    category: "Ứng dụng di động · Đặt lịch",
    platform: "Mobile · iOS & Android",
    accent: { from: "hsl(334 82% 60%)", to: "hsl(352 84% 62%)" },
    summary:
      "Ứng dụng đặt lịch cho spa, salon, phòng khám: khách chọn dịch vụ và khung giờ ngay trên điện thoại, hệ thống tự nhắc lịch và chăm sóc lại khách cũ bằng AI.",
    heroScreens: ["booking", "chat"],
    previewScreen: "booking",
    tags: ["Đặt lịch", "Nhắc hẹn AI", "CSKH"],
    metrics: [
      { value: "−60%", label: "khách quên hẹn" },
      { value: "+40%", label: "khách quay lại" },
      { value: "24/7", label: "đặt lịch online" }
    ],
    features: [
      {
        icon: Calendar,
        title: "Đặt lịch tự phục vụ",
        text: "Khách xem lịch trống theo thời gian thực và tự đặt chỗ chỉ trong vài chạm, không cần gọi điện.",
        screen: "booking"
      },
      {
        icon: Bot,
        title: "AI nhắc hẹn & chăm sóc",
        text: "Tự động nhắc lịch trước giờ hẹn và gợi ý đặt lại cho khách cũ đúng chu kỳ chăm sóc.",
        screen: "chat"
      }
    ],
    techStack: ["React Native", "Next.js", "TypeScript", "PostgreSQL", "Node.js"]
  },
  {
    slug: "phan-mem-quan-ly-ban-hang",
    name: "Phần Mềm Quản Lý Bán Hàng",
    tagline:
      "Bán hàng, quản lý tồn kho và doanh thu trên cùng một app — gọn gàng, realtime.",
    category: "Phần mềm quản lý · Bán hàng",
    platform: "Mobile · Máy tính",
    accent: { from: "hsl(160 78% 41%)", to: "hsl(182 72% 42%)" },
    summary:
      "Giải pháp quản lý bán hàng cho cửa hàng và quán: thu ngân nhanh, đồng bộ tồn kho, theo dõi doanh thu và khách hàng thân thiết — dùng được trên cả điện thoại và máy tính.",
    heroScreens: ["pos", "analytics"],
    previewScreen: "pos",
    tags: ["POS", "Tồn kho", "Báo cáo"],
    metrics: [
      { value: "Realtime", label: "đồng bộ tồn kho" },
      { value: "1 chạm", label: "thu ngân nhanh" },
      { value: "Đa chi nhánh", label: "quản lý tập trung" }
    ],
    features: [
      {
        icon: CreditCard,
        title: "Thu ngân nhanh gọn",
        text: "Giao diện bán hàng tối giản, chọn món và thanh toán chỉ trong vài giây, phù hợp giờ cao điểm.",
        screen: "pos"
      },
      {
        icon: Package,
        title: "Quản lý tồn kho & báo cáo",
        text: "Tồn kho cập nhật realtime sau mỗi đơn, báo cáo doanh thu và mặt hàng bán chạy rõ ràng.",
        screen: "analytics"
      }
    ],
    techStack: ["React Native", "Next.js", "TypeScript", "PostgreSQL", "Prisma"]
  }
];

export function getSampleProducts(): SampleProduct[] {
  return sampleProducts;
}

export function getSampleProduct(slug: string): SampleProduct | undefined {
  return sampleProducts.find((p) => p.slug === slug);
}
