import React, {Component} from 'react';
import {ViewPropTypes, StatusBar, StyleSheet, View, Text, Platform, DeviceInfo} from 'react-native';
import {PropTypes} from 'prop-types';

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度

const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
}

export default class NavigationBar extends Component {

    // 类型检查
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hidden: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
    };

    // 默认属性
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false
        }
    }

    render() {
        let statusBar = this.props.statusBar.hidden ? null :
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} />
            </View>;

        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode={'head'} numberOfLines={1} style={styles.title}>{this.props.title}</Text>;

        let contentView = this.props.hidden ? null :
            <View style={styles.navBarContainer}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>;

        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {contentView}
            </View>
        )
    }

    getButtonElement(button) {
        return (
            <View style={styles.navBarButton}>
                {button ? button : null}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    },
    container: {
        backgroundColor: '#2196f3'
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    navBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,

    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    navBarButton: {
        alignItems: 'center'
    }
});