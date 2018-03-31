<template>
    <Row>
        <Col span="12">
            <span style="text-align:center;">zty管理系统</span>
        </Col>
        <Col span="12">
            <Icon type="calendar" :size=30 color="white"></Icon>

            <Dropdown trigger="custom" :visible="visible" >
                <a href="javascript:void(0)" @click="handleOpen">
                    <Badge count="4">
                            <Icon type="chatboxes" :size=30 color="white"></Icon>
                    </Badge>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>张腾跃发过来的消息：你好啊</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <DropdownItem disabled>豆汁儿</DropdownItem>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                    <DropdownItem divided>北京烤鸭</DropdownItem>
                    <div style="text-align: right;margin:10px;">
                        <Button type="primary" @click="handleClose">关闭</Button>
                    </div>
                </DropdownMenu>
            </Dropdown>

            <Avatar icon="person"></Avatar>
        </Col>
    </Row>
</template>

<script>
export default {
        data () {
            return {
                visible: false
            }
        },
        methods: {
            handleOpen () {
                this.visible = true;
            },
            handleClose () {
                this.visible = false;
            }
        }
    }
</script>

