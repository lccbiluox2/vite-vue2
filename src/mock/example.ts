import Mock from 'mockjs';

// 模拟 GET 请求的接口
Mock.mock('/api/example', 'get', {
  code: 200,
  message: 'success',
  result: {
    id: Mock.Random.guid(),
    name: Mock.Random.name(),
    age: Mock.Random.integer(18, 60),
  },
});

// 模拟 POST 请求的接口
Mock.mock('/api/example', 'post', {
  code: 200,
  message: 'success',
  result: {
    status: 'created',
  },
});