const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// 루트 확인용
app.get('/', (req, res) => {
  res.send('✅ 프록시 서버 정상 동작 중');
});

// 프록시 라우터: GPT가 이 경로로 요청 보냄
app.get('/proxy/lawSearch', async (req, res) => {
  const { keyword } = req.query;

  try {
    const response = await axios.get('https://www.law.go.kr/DRF/lawSearch.do', {
      params: {
        OC: process.env.OC,
        target: 'lawjosub',
        keyword,
        search: 2,
        fullText: 'true',
        matchType: 'morph',
        display: 5,
        page: 1
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('📛 프록시 요청 에러:', error.message);
    res.status(500).json({ error: '법제처 API 요청 실패' });
  }
});

app.listen(port, () => {
  console.log(`🚀 프록시 서버 실행 중 http://localhost:${port}`);
});
