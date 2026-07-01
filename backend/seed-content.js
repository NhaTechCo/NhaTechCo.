const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const defaultContent = {
  hero: {
    badge: "Website hiện đại · Ứng dụng di động · Dễ dùng mỗi ngày",
    title: "Giải pháp Website, Ứng dụng và Phần mềm giúp doanh nghiệp vận hành tốt hơn",
    description: "NhaTech Co. thiết kế những sản phẩm số dễ dùng, đẹp mắt và phù hợp với cách doanh nghiệp của bạn làm việc mỗi ngày.",
    cta1: "Nhận tư vấn miễn phí",
    cta2: "Xem dịch vụ",
    metrics: [
      { value: 48, suffix: "%", label: "khách hàng dễ liên hệ hơn" },
      { value: 6, suffix: " tuần", label: "cho phiên bản đầu tiên" },
      { value: 95, suffix: "+", label: "điểm hài lòng mục tiêu" }
    ]
  },
  services: {
    title: "Dịch vụ số dành cho doanh nghiệp và cá nhân",
    description: "NhaTech Co. hỗ trợ từ trang web giới thiệu, ứng dụng điện thoại đến phần mềm quản lý và công cụ giúp công việc hằng ngày gọn gàng hơn.",
    items: [
      { title: "Website doanh nghiệp", text: "Trang web giới thiệu thương hiệu, dịch vụ và sản phẩm một cách chuyên nghiệp, dễ đọc và dễ liên hệ." },
      { title: "Landing page bán hàng", text: "Trang giới thiệu sản phẩm hoặc chiến dịch, tập trung vào nội dung rõ ràng và hành động chuyển đổi." },
      { title: "Ứng dụng điện thoại", text: "Ứng dụng cho khách hàng, nhân viên hoặc cộng đồng của bạn, được thiết kế để thao tác đơn giản trên di động." },
      { title: "Phần mềm quản lý", text: "Công cụ giúp quản lý đơn hàng, khách hàng, lịch hẹn, nhân sự hoặc công việc nội bộ gọn gàng hơn." },
      { title: "Ứng dụng máy tính", text: "Giải pháp dành cho các công việc cần thao tác thường xuyên trên máy tính, ổn định và dễ sử dụng." },
      { title: "Công cụ thông minh", text: "Trợ lý hoặc công cụ giúp tự động hóa những việc lặp lại, hỗ trợ chăm sóc khách hàng và xử lý thông tin nhanh hơn." }
    ]
  },
  experience: {
    title: "Trải nghiệm người dùng là ưu tiên đầu tiên",
    description: "Một sản phẩm tốt không chỉ là đẹp. Nó phải dễ hiểu, dễ thao tác và giúp người dùng hoàn thành công việc nhanh hơn.",
    highlights: [
      "Dễ hiểu ngay từ lần đầu",
      "Đẹp nhưng không rối",
      "Phù hợp với thói quen sử dụng",
      "Sẵn sàng phát triển lâu dài"
    ]
  },
  process: {
    title: "Quy trình rõ ràng để bạn dễ theo dõi",
    description: "Mỗi bước đều có mục tiêu cụ thể để bạn biết sản phẩm đang được làm đến đâu, cần góp ý gì và khi nào có thể sử dụng.",
    steps: [
      { title: "Lắng nghe nhu cầu", text: "Chúng tôi tìm hiểu mục tiêu, khách hàng và vấn đề bạn đang muốn giải quyết." },
      { title: "Đề xuất hướng làm", text: "Bạn nhận được định hướng giao diện, tính năng và lộ trình phù hợp trước khi bắt đầu." },
      { title: "Thiết kế trải nghiệm", text: "Chúng tôi sắp xếp nội dung, màn hình và luồng thao tác sao cho người dùng dễ hiểu nhất." },
      { title: "Xây dựng sản phẩm", text: "Sản phẩm được hoàn thiện theo từng phần để bạn dễ theo dõi và góp ý." },
      { title: "Kiểm tra và chỉnh sửa", text: "Chúng tôi kiểm tra trên nhiều thiết bị, tối ưu trải nghiệm và chỉnh sửa các điểm chưa hợp lý." },
      { title: "Bàn giao và đồng hành", text: "Sau khi hoàn thiện, bạn được hướng dẫn sử dụng và có thể tiếp tục phát triển thêm khi cần." }
    ]
  },
  solutions: {
    title: "Những sản phẩm NhaTech Co. có thể đồng hành cùng bạn",
    description: "Từ một trang giới thiệu đơn giản đến công cụ quản lý riêng, nội dung luôn được sắp xếp để người dùng dễ hiểu và dễ thao tác.",
    tags: [
      "Website hiện đại", "Ứng dụng di động", "Phần mềm quản lý",
      "Ứng dụng máy tính", "Công cụ thông minh", "Landing page bán hàng",
      "Quản lý lịch hẹn", "Theo dõi đơn hàng", "Chăm sóc khách hàng", "Báo cáo dễ hiểu"
    ]
  },
  testimonials: {
    title: "Những khách hàng cần sản phẩm dễ hiểu, đẹp và dùng được mỗi ngày",
    items: [
      { quote: "NhaTech Co. giúp chúng tôi sắp xếp lại nội dung website rõ ràng hơn. Khách hàng dễ hiểu dịch vụ và liên hệ nhanh hơn.", name: "Minh Hoàng", role: "Chủ cửa hàng nội thất" },
      { quote: "Ứng dụng đặt lịch mới dễ dùng hơn cho cả khách và nhân viên. Việc theo dõi lịch hẹn cũng gọn gàng hơn trước.", name: "Linh Trần", role: "Quản lý spa" },
      { quote: "Điểm tôi thích là cách tư vấn rất dễ hiểu. Những phần chưa cần thiết được lược bớt để sản phẩm tập trung hơn.", name: "Quang Phạm", role: "Nhà sáng lập trung tâm đào tạo" }
    ]
  },
  contact: {
    title: "Bạn đang có ý tưởng cho website, app hoặc phần mềm riêng?",
    description: "Hãy bắt đầu bằng một buổi trao đổi ngắn. NhaTech Co. sẽ giúp bạn nhìn rõ hướng đi phù hợp trước khi xây dựng.",
    benefits: [
      "Tư vấn cách làm dễ hiểu trước khi báo giá",
      "Đề xuất phạm vi phù hợp với ngân sách",
      "Hỗ trợ chỉnh sửa và phát triển thêm khi cần"
    ]
  },
  footer: {
    description: "Thiết kế website, ứng dụng di động, phần mềm quản lý và công cụ thông minh giúp doanh nghiệp vận hành hiệu quả hơn.",
    email: "caoman26@gmail.com",
    phone: "034 868 8001",
    address: "Phường Ngũ Hành Sơn, Đà Nẵng, Việt Nam"
  }
};

async function main() {
  console.log("Seeding site content...");

  for (const [key, value] of Object.entries(defaultContent)) {
    await prisma.siteContent.upsert({
      where: { key },
      update: {},  // Don't overwrite existing data
      create: { key, value }
    });
    console.log(`  ✓ ${key}`);
  }

  console.log("Done!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
