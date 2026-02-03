const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// あなたのVAPIDキー（ここに貼り付けます）
const publicKey = 'BAp0wnGuvaoZk_Q7Bn4H4DWAR2Zdi9juZECl10m290Ff9sAJqiaXepWYvGgbI7WOb9K3O0MOTG8TVi_hg_ovfEg';
const privateKey = 'ec0mF_H0Y-Mh7ijNw-0lzUn-P3_9GnoQD58FeaXUMec';

webpush.setVapidDetails(
  'mailto:example@example.com', // あなたのメールアドレス（形式だけでOK）
  publicKey,
  privateKey
);

// GASから命令を受け取る窓口
app.post('/send-push', async (req, res) => {
  try {
    const { subscription, message } = req.body;
    await webpush.sendNotification(subscription, message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Push Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));