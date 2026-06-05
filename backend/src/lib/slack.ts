import type { Lead } from "@/lib/leads";

const serviceLabels: Record<Lead["service"], string> = {
  website: "Website doanh nghiệp",
  "mobile-app": "Ứng dụng điện thoại",
  "product-design": "Thiết kế trải nghiệm sản phẩm",
  "full-stack": "Phần mềm quản lý hoặc công cụ riêng"
};

const budgetLabels: Record<Lead["budget"], string> = {
  "under-50": "Dưới 50 triệu",
  "50-100": "50 - 100 triệu",
  "100-250": "100 - 250 triệu",
  "250-plus": "Trên 250 triệu"
};

export async function sendLeadToSlack(lead: Lead) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: `Yêu cầu tư vấn mới từ ${lead.name}`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Yêu cầu tư vấn mới"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Họ tên:*\n${lead.name}`
            },
            {
              type: "mrkdwn",
              text: `*Doanh nghiệp:*\n${lead.company}`
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${lead.email}`
            },
            {
              type: "mrkdwn",
              text: `*Nhu cầu:*\n${serviceLabels[lead.service]}`
            },
            {
              type: "mrkdwn",
              text: `*Ngân sách:*\n${budgetLabels[lead.budget]}`
            },
            {
              type: "mrkdwn",
              text: `*Thời gian:*\n${new Date(lead.createdAt).toLocaleString("vi-VN")}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Nội dung chia sẻ:*\n${lead.message}`
          }
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Slack webhook failed with status ${response.status}`);
  }
}
